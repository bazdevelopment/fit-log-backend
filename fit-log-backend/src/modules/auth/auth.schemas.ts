import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const signUpUserFields = {
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
};

export const signUpUserSchema = z.object({
  ...signUpUserFields,
  password: z.string().min(6),
});

export const signUpUserResponse = z.object({
  ...signUpUserFields,
  salt: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatarImage: z.string().nullable(),
  sex: z.string().nullable(),
  birthDate: z.date().nullable(),
  phoneNumber: z.string().nullable(),
  nationality: z.string().nullable(),
  passwordResetToken: z.string().nullable(),
  passwordResetExpires: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const signUpUserJsonSchema = {
  body: zodToJsonSchema(
    signUpUserSchema.omit({ id: true }),
    "signUpUserSchema"
  ),
};
