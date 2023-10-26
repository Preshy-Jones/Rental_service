import { z } from "zod";
import { GALLERYIMAGEUPLOADTYPE, THREESIXTYIMAGEUPLOADTYPE } from "../types";

const threeSixtyImageEnum = z.nativeEnum(THREESIXTYIMAGEUPLOADTYPE);
const galleryImageEnum = z.nativeEnum(GALLERYIMAGEUPLOADTYPE);
const threeSixtyImageUploadSchemaPayload = {
  body: z.object({
    type: threeSixtyImageEnum,
    carId: z.string(),
  }),
};

const galleryImageUploadSchemaPayload = {
  body: z.object({
    type: galleryImageEnum,
    carId: z.string(),
  }),
};

export const threeSixtyImageUploadSchema = z.object({
  ...threeSixtyImageUploadSchemaPayload,
});

export const galleryImageUploadSchema = z.object({
  ...galleryImageUploadSchemaPayload,
});

export type ImageUploadInput = z.infer<typeof threeSixtyImageUploadSchema>;
