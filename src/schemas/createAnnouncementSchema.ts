import { z } from "zod";

const phoneRegex = new RegExp(
  /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/
);
const isBase64 = (str: string) => {
  const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/;
  if (base64Pattern.test(str)) {
    str = str.replace(base64Pattern, "");
  }

  try {
    return btoa(atob(str)) === str;
  } catch (e) {
    return false;
  }
};

const CategoryEnum = z.enum(["Aula Particular", "Movéis", "Livros", "Roupa"]);
const ItemTypeEnum = z.enum(["Busca de Item", "Oferta de Item"]);
const LocalizationEnum = z.enum([
  "Praia Vermelha",
  "Gragoatá",
  "Valonguinho",
  "Santo Antonio de Padua",
  "Campos dos Goytacazes",
]);

const categoryMap = { Livros: 0, Roupa: 1, Movéis: 2, "Aula Particular": 3 };
const campusMap = {
  "Praia Vermelha": 0,
  Gragoatá: 1,
  Valonguinho: 2,
  "Santo Antonio de Padua": 3,
  "Campos dos Goytacazes": 4,
};
const itemTypeMap = { "Busca de Item": 0, "Oferta de Item": 1 };

export const createAnnouncementSchema = z
  .object({
    title: z.string().min(1, { message: "Campo obrigatório" }),
    description: z.string().min(1, { message: "Campo obrigatório" }),
    category: CategoryEnum.transform((val) => categoryMap[val]),
    item_type: ItemTypeEnum.transform((val) => itemTypeMap[val]),
    campus: LocalizationEnum.transform((val) => campusMap[val]),
    price: z.union([
      z
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
      z.literal("").transform(() => undefined),
    ]),
    email_contact: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "E-mail inválido" }),
    phone_contact: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .regex(phoneRegex, { message: "Telefone inválido" })
      .transform((value) => value.replace(/\(|\)|\s|\/|-/g, "")),
    images: z
      .array(
        z
          .string()
          .refine(isBase64, { message: "Imagem em formato base64 inválido" })
          .transform((str) => str.replace(/^data:image\/[a-zA-Z]+;base64,/, "")) // Remover prefixo base64
      )
      .optional(),
    user_id: z.string().nonempty("User ID is required"),
  })
  .refine(
    (data) =>
      data.item_type === itemTypeMap["Busca de Item"] ||
      (data.price !== undefined && data.price !== null),
    { message: "Preço é obrigatório para Oferta de Item", path: ["price"] }
  )
  .refine(
    (data) =>
      data.item_type === itemTypeMap["Busca de Item"] ||
      (data.images?.length ?? 0) > 0,
    { message: "Imagem é obrigatória para Oferta de Item", path: ["images"] }
  );
