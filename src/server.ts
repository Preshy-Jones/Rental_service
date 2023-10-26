import express from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { errorHandler, notFoundHandler } from "./middlewares";
import corsOptions from "./config/corsOptions";
import cors from "cors";
import fileUpload from "express-fileupload";
// const multer = require("multer");
import multer from "multer";
const app = express();

dotenv.config();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(fileUpload());

const upload = multer({ dest: "uploads/" });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", require("./routes/v1"));
app.use("/api/admin", require("./routes/admin"));

app.use(notFoundHandler);
app.use(errorHandler);

const mongooseConnect = async () => {
  // console.log(process.env.DB_CONNECT);

  try {
    await mongoose.connect(process.env.MONGO_HOST!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    } as ConnectOptions);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

mongooseConnect();

const port = process.env.PORT || 8008;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
