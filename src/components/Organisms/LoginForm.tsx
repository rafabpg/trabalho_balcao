import React from "react";
import Button from "@/components/Atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import FormInput from "../Molecules/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "@/hooks/useNotification";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const { showError } = useNotification();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      await login(data.cpf, data.password);
    } catch (error) {
      showError("Login ou senha inválidos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-primary-darker text-center text-2xl font-bold">
        Faça seu login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex pt-8 flex-col gap-4 justify-center items-center"
      >
        <FormInput
          className="sm:w-[150px] md:w-[200px] lg:w-[360px]"
          type="text"
          placeholder="ex:123.456.789-13"
          id="cpf"
          {...register("cpf")}
          label="CPF"
          labelClassName="text-primary-darker font-normal text-xl"
          errorMessage={errors.cpf?.message}
        />
        <FormInput
          type="password"
          placeholder="Senha"
          id="senha"
          {...register("password")}
          label="Senha"
          className="sm:w-[150px] md:w-[200px] lg:w-[360px]"
          labelClassName="text-primary-darker font-normal text-xl"
          errorMessage={errors.password?.message}
        />
        <Button className="px-20 py-2 mt-8" text="Entrar" />
      </form>
    </div>
  );
};

export default LoginForm;
