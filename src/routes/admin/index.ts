import express from "express";
import {
  galleryImageUpload,
  testImageUpload,
  threeSixtyImageUpload,
} from "../../controllers/admin/fileupload";
const router = express.Router();
import multer from "multer";
import { nanoid } from "nanoid";
import validateResource from "../../middlewares/validateResource";
import {
  galleryImageUploadSchema,
  threeSixtyImageUploadSchema,
} from "../../schema/imageUploadSchema";

// const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
  res.send("Hello Admin!");
});

router.post("/fileUpload", testImageUpload);
//single file upload
// router.post("/images", upload.single("image"), carImageUpload);

// //multiple file upload with maximum number of files constraint
// router.post("/images", upload.array("images", 2), carImageUpload);
// const multipleUpload = upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "resume", maxCount: 2 },
// ]);
// router.post("/images", multipleUpload, carImageUpload);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const { originalname } = file;
//     cb(null, nanoid() + "-" + originalname);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    //    cb(null, false);
    cb(new Error("File is not of correct type!"));
  }

  // You can always pass an error if something goes wrong:
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 1000000 } });
//multiple file upload with maximum number of files constraint
router.post(
  "/images/360",
  upload.array("images"),
  validateResource(threeSixtyImageUploadSchema),
  threeSixtyImageUpload
);

router.post(
  "/images/interior360",
  upload.array("images", 1),
  validateResource(threeSixtyImageUploadSchema),
  threeSixtyImageUpload
);
router.post(
  "/images/gallery",
  upload.array("images", 1),
  validateResource(galleryImageUploadSchema),
  galleryImageUpload
);

module.exports = router;
