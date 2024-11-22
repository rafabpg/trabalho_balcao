import { z } from "zod";

const phoneRegex = new RegExp(
  /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/
);
const isBase64 = (str: string) => {
  const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/;
  if (base64Pattern.test(str)) {
    str = str.replace(base64Pattern, '');
  }
  
  try {
    return btoa(atob(str)) === str;
  } catch (e) {
    return false;
  }
};

const CategoryEnum = z.enum(["Aula Particular", "Movéis", "Livros"]);
const ItemTypeEnum = z.enum(["Busca de Item", "Procura de Item"]);
const LocalizationEnum = z.enum([
  "Praia Vermelha",
  "Gragoatá",
  "Valonguinho",
  "Reitoria",
  "HUAP",
]);

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }),
  description: z.string().min(1, { message: "Campo obrigatório" }),
  category: CategoryEnum,
  item_type: ItemTypeEnum,
  localization: LocalizationEnum,
  price: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .transform((val) => {
      const cleanedValue = val
        .replace(/R\$\s*/, "")
        .replace(/[^\d,.-]/g, "")
        .replace(",", ".");
      return parseFloat(cleanedValue);
    })
    .refine((val) => !isNaN(val) && val >= 0.0001 && val <= 999999999, {
      message: "Preço deve estar entre 0.0001 e 999999999",
    }),
  email: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .email({ message: "E-mail inválido" }),
  phone: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .regex(phoneRegex, { message: "Telefone inválido" })
    .transform((value) => value.replace(/\(|\)|\s|\/|-/g, "")),
  images: z
    .array(
      z
        .string()
        .refine(isBase64, { message: "Imagem em formato base64 inválido" })
        .transform((str) => str.replace(/^data:image\/[a-zA-Z]+;base64,/, '')) // Remover prefixo base64
    )
    .optional(),
});