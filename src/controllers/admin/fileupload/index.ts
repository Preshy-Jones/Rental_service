import { NextFunction, Request, Response } from "express";
const PORT = 3017;
const AWS = require("aws-sdk");
import { nanoid } from "nanoid";
import { s3UploadService } from "../../../services/s3UploadService";
import { successResponse } from "../../../utils";
import Car from "../../../database/models/car";
import { THREESIXTYIMAGEUPLOADTYPE } from "../../../types";

export const testImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AWS.config.update({
    accessKeyId: "AKIAXPTXA4ACJAGKVC5I",
    secretAccessKey: "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",
    region: "eu-west-2",
  });
  console.log(req.files);
  const s3 = new AWS.S3();
  //ts-ignore
  // @ts-ignore
  const file = Array.isArray(req?.files?.file)
    ? // @ts-ignore
      req.files?.file[0]
    : // @ts-ignore
      req.files?.file;

  const fileContent = Buffer.from(file?.name as string, "binary");

  const params = {
    Bucket: "dunecar",
    Key: `360/${file?.name}`,
    Body: fileContent,
  };

  s3.upload(params, function (err: any, data: any) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);

    res.send({
      status: "success",
      message: "File uploaded successfully.",
      data,
    });
  });
};

export const threeSixtyImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files;

    // return res.json(files);
    console.log(files);

    const { carId, type } = req.body;

    const result = await s3UploadService(files, carId, type);
    const baseUrl = process.env.AWS_BUCKET_PATH;
    const completeImageUrl =
      type === THREESIXTYIMAGEUPLOADTYPE.interior360
        ? `${baseUrl}/${result}`
        : `${baseUrl}/${carId}/${type}`;

    const car = await Car.findByIdAndUpdate(carId, {
      [`media.${type}`]: completeImageUrl,
    });

    console.log(completeImageUrl);
    return res.send(
      successResponse("File uploaded successfully", completeImageUrl)
    );
  } catch (error) {
    next(error);
  }
};

export const galleryImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files;

    console.log(files);

    const { carId, type } = req.body;

    const result = await s3UploadService(files, carId, "gallery", type);
    const baseUrl = process.env.AWS_BUCKET_PATH;

    const completeImageUrl = `${baseUrl}/${result}`;

    //find car with cardId

    const car = await Car.findByIdAndUpdate(carId, {
      [`media.gallery.${type}`]: completeImageUrl,
    });

    console.log(completeImageUrl);
    return res.send(
      successResponse("File uploaded successfully", completeImageUrl)
    );
  } catch (error) {
    next(error);
  }
};
