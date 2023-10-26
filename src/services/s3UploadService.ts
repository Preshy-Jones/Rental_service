const { S3 } = require("aws-sdk");
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { THREESIXTYIMAGEUPLOADTYPE } from "../types";

export const s3UploadService = async (
  files: any,
  carId: string,
  type: string,
  galleryType?: string
) => {
  const accessKeyId: string = process.env.AWS_ACCESS_KEY_ID as string;
  const secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY as string;
  const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  const params = files.map((file: any) => {
    const imagePath =
      type === "gallery"
        ? `${carId}/${type}/${galleryType}/${nanoid()}-${file.originalname}`
        : `${carId}/${type}/${nanoid()}-${file.originalname}`;
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imagePath,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  });

  const results = await Promise.all(
    params.map((param: any) => {
      return new Promise((resolve, reject) => {
        s3Client
          .send(new PutObjectCommand(param))
          .then((data: any) => {
            resolve(data);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    })
  );

  if (type === "gallery" || type === THREESIXTYIMAGEUPLOADTYPE.interior360) {
    return params[0].Key;
  }
};
