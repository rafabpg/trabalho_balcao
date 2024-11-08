import Button from "@/components/Atoms/Button";

import React, { useState } from 'react'
import {MouseEvent} from "react";
const LoginForm =() => {

const [CPF,setCPF] = useState('')
const [password,setPassword] = useState('')
const [CPFError,setCPFError] = useState('')
const [passwordError,setPasswordError] = useState('')

const onButtonClick = (event:MouseEvent) => {
    if('' == CPF){
        setCPFError("Insira seu CPF")
    }
    else if(!((/^[0-9]{3,3}\.[0-9]{3,3}\.[0-9]{3,3}\-[0-9]{2,2}$/.test(CPF)) ||  (/^[0-9]{3,3}[0-9]{3,3}[0-9]{3,3}[0-9]{2,2}$/.test(CPF)))){
        setCPFError("CPF inválido")
    }
    else{
        setCPFError('')
    }
    if('' == password){
        setPasswordError("Insira sua senha")
    }
    else{
        setPasswordError('')
    }
    return

    // autenticação seria feita aqui
};


return (
        <div>
        
        <div className="login-container">
        
        <label className='login-title' >Faça seu login</label>
        
            <div>       
            <label className = "login-input">CPF</label>      
            <input value ={CPF} placeholder = "ex:123.456.789-13" onChange ={(ev) => setCPF(ev.target.value)} type="text" id="cpf" className = "input"/>
            <label className = "errorLabel">{CPFError}</label>
            </div>  

            <div>
            <label className = "login-input">Senha</label>        
            <input value ={password} onChange ={(ev) => setPassword(ev.target.value)}type="password" id="senha" className = "input"/>
            <label className = "errorLabel">{passwordError}</label>
            </div>
        
        <div className="button-container">
        
        
        <Button text="Entrar" onClick={onButtonClick}/>
        </div>
        
        
        </div>







        </div>
    





);






}; export default LoginForm