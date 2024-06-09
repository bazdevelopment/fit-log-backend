import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const registerMembershipCardSchema = z.object({
  cardNumber: z.string(),
  userId: z.string().optional(),
});

export const { schemas: membershipCardSchemas, $ref } = buildJsonSchemas(
  {
    registerMembershipCardJsonSchema: registerMembershipCardSchema,
  },
  { $id: "membershipCardSchema" }
);
