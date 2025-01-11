import { z } from "zod";

export const loginSchema = z.object({
  cpf: z
    .string()
    .nonempty({ message: "Insira seu CPF" })
    .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$|^[0-9]{11}$/, {
      message: "CPF inválido",
    }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;