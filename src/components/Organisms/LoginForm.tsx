import React, { useState, MouseEvent } from "react";
import Button from "@/components/Atoms/Button";
import { useAuth } from "@/hooks/useAuth";

const LoginForm: React.FC = () => {
  const [CPF, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [CPFError, setCPFError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = useAuth();

  const onButtonClick = async (event: MouseEvent) => {
    event.preventDefault();

    if (CPF === "") {
      setCPFError("Insira seu CPF");
      return;
    } else if (
      !(
        /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/.test(CPF) ||
        /^[0-9]{11}$/.test(CPF)
      )
    ) {
      setCPFError("CPF inválido");
      return;
    } else {
      setCPFError("");
    }

    if (password === "") {
      setPasswordError("Insira sua senha");
      return;
    } else {
      setPasswordError("");
    }

    try {
      await login(CPF, password);
      window.location.href = "/";
    } catch (error) {
      setPasswordError("Login ou senha inválidos");
    }
  };

  return (
    <div>
      <div className="grid grid-rows-4 grid-cols-1 justify-center items-center gap-y-2">
        <label className="ml-36 text-primary-darker text-center text-2xl font-sans font-bold">
          Faça seu login
        </label>

        <div className="grid w-40 ml-40 gap-y-2">
          <label className="text-primary-darker text-left text-xl">CPF</label>
          <input
            value={CPF}
            placeholder="ex:123.456.789-13"
            onChange={(ev) => setCPF(ev.target.value)}
            type="text"
            id="cpf"
            className="border border-primary-darker rounded-md w-80"
          />
          <label className="text-red-600 text-xs">{CPFError}</label>
        </div>

        <div className="grid w-40 ml-40 gap-y-2">
          <label className="text-primary-darker text-left text-xl">Senha</label>
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            id="senha"
            className="border border-primary-darker rounded-md w-80"
          />
          <label className="text-red-600 text-xs">{passwordError}</label>
        </div>

        <Button
          className="w-56 h-8 ml-56 text-center"
          text="Entrar"
          onClick={onButtonClick}
        />
      </div>
    </div>
  );
};

export default LoginForm;
