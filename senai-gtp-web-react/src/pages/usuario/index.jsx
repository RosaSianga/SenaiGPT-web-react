import "./usuario.css";
import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";

function Usuario() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    const cadastrar = async () => {


        if (nome == "") {
            alert("preencha o nome do usuário.");
            return;
        }

        if (email == "") {
            alert("preencha o email.");
            return;
        }

        if (password == "") {
            alert("preencha a senha.");
            return;
        }

        if (nome == "") {
            alert("preencha a confirmação da senha.");
            return;
        }

        if (password != passwordConfirm) {

            alert("As senhas não conferem.");
            return

        }

        let estruturaUser = {
            name: nome,
            email: email,
            password: password
        };



        let response = await fetch("https://senai-gpt-api.up.railway.app/users" , {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(
                estruturaUser
            )
        });

        if (response.ok == true) {

            alert("Usuário cadastrado co sucesso");

            window.location.href = "/login";
        }


    }


    return (
        <>

            <header></header>

            <main className="page-container-account">

                <div className="robo-image-account">

                </div>

                <div className="login-container-account">

                    <img className="logo-account" src={logo} alt="Logo do SenaiGPT" />

                    <h1>Novo Usuário</h1>

                    <input className="inpt" value={nome} onChange={event => setNome(event.target.value)} type="texto" placeholder="Insira o nome do usuário" />
                    <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o e-mail" />
                    <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira a senha" />
                    <input className="inpt" value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)} type="password" placeholder="Confirme a senha" />

                    <button className="btn" onClick={() => cadastrar()}>Cadastrar</button>

                    <a href="/login">Clique aqui para fazer o login</a>

                </div>

            </main>

            <footer></footer>

        </>
    )
}


export default Usuario;
