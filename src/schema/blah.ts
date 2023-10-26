import { z } from "zod";

enum THREESIXTYIMAGEUPLOADTYPE {
  exterior360 = "exterior360",
  interior360 = "interior360",
  openDoor360 = "openDoor360",
}
const threeSixtyImageEnum = z.nativeEnum(THREESIXTYIMAGEUPLOADTYPE);

const threeSixtyImageUploadSchemaPayload = {
  body: z.object({
    type: threeSixtyImageEnum,
  }),
};
export const threeSixtyImageUploadSchema = z.object({
  ...threeSixtyImageUploadSchemaPayload,
});

const payload = {
  body: {
    type: "exterior360",
  },
};

console.log(threeSixtyImageUploadSchema.parse(payload));
