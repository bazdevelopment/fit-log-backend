import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const userResponseSchema = z.object({
  userId: z.string(),
  avatarImage: z.string().nullable(),
  sex: z.string().nullable(),
  birthDate: z.date().nullable(),
  phoneNumber: z.string().nullable(),
  nationality: z.string().nullable(),
});

export const userResponseToJsonSchema = {
  body: zodToJsonSchema(userResponseSchema, "userResponseSchema"),
};
