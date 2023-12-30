import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const userResponseSchema = z
  .object({
    avatarImage: z.string().nullable(),
    sex: z.string().nullable(),
    birthDate: z.date().nullable(),
    phoneNumber: z.string().nullable(),
    nationality: z.string().nullable(),
    weight: z.number().nullable(),
    goal: z.array(z.string()).default([]),
    activityLevel: z.string().nullable(),
  })
  .partial();

export const userResponseToJsonSchema = {
  body: zodToJsonSchema(userResponseSchema, "userResponseSchema"),
};
