import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

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

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userResponseToJsonSchema: userResponseSchema,
  },
  { $id: "userSchema" }
);
