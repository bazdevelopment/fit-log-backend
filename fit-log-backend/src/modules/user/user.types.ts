import z from "zod";
import { userResponseSchema } from "./user.schemas";
export type TUpdateUser = z.infer<typeof userResponseSchema>;
