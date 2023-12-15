import z from "zod";
import {
  signInUserSchema,
  signUpUserResponse,
  signUpUserSchema,
} from "./auth.schemas";

export type TSignUpUser = z.infer<typeof signUpUserSchema>;
export type TTSignUpUserWithoutId = Omit<TSignUpUser, "id">;
export type TSignUpUserResponse = z.infer<typeof signUpUserResponse>;
export type TSignInUser = z.infer<typeof signInUserSchema>;
