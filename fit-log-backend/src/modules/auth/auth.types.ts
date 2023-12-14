import z from "zod";
import { signUpUserResponse, signUpUserSchema } from "./auth.schemas";

export type TSignUpUser = z.infer<typeof signUpUserSchema>;
export type TTSignUpUserWithoutId = Omit<TSignUpUser, "id">;
export type TSignUpUserResponse = z.infer<typeof signUpUserResponse>;
