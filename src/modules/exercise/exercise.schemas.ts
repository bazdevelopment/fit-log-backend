import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const exercisesResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bodyPart: z.string(),
  target: z.string(),
  equipment: z.string(),
  gifUrl: z.string(),
  image: z.string().nullable(),
  secondaryMuscles: z.array(z.string()),
  instructions: z.array(z.string()),
});

export const { schemas: exerciseSchemas, $ref } = buildJsonSchemas(
  {
    exercisesResponseToJsonSchema: exercisesResponseSchema,
  },
  { $id: "exerciseSchema" }
);
