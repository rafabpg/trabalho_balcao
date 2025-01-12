import { z } from "zod";

export const CategoryEnumSchema = z.enum(["Aula Particular", "Movéis", "Livros", "Roupa"]);
export const LocalizationEnumSchema = z.enum([
  "Praia Vermelha",
  "Gragoatá",
  "Valonguinho",
  "Santo Antonio de Padua",
  "Campos dos Goytacazes",
]);

export const categoryMap = { "Livros": 0, "Roupa": 1, "Movéis": 2, "Aula Particular": 3 };
export const campusMap = {
  "Praia Vermelha": 0,
  Gragoatá: 1,
  Valonguinho: 2,
  "Santo Antonio de Padua": 3,
  "Campos dos Goytacazes": 4,
};

export const updateAnnouncementSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }),
  description: z.string().min(1, { message: "Campo obrigatório" }),
  category: CategoryEnumSchema.transform((val) => categoryMap[val]),
  campus: LocalizationEnumSchema.transform((val) => campusMap[val]),
  price: z
    .number()
    .min(0.0001, { message: "Preço deve ser maior que 0" })
    .max(999999999, { message: "Preço deve ser menor que 999999999" }),
  email_contact: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .email({ message: "E-mail inválido" }),
  phone_contact: z.string().min(1, { message: "Campo obrigatório" }),
});

export type UpdateAnnouncementSchema = z.infer<typeof updateAnnouncementSchema>;
