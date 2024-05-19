import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const userResponseSchema = z
  .object({
    avatarImage: z.string().nullable(),
    gender: z.string().nullable(),
    birthDate: z.date().nullable(),
    phoneNumber: z.string().nullable(),
    nationality: z.string().nullable(),
    weight: z.number().nullable(),
    goals: z.array(z.string()).default([]),
    activityLevel: z.string().nullable(),
    age: z.number().nullable(),
    height: z.number().nullable(),
    isOnboarded: z.boolean().default(false),
  })
  .partial();

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userResponseToJsonSchema: userResponseSchema,
  },
  { $id: "userSchema" }
);
