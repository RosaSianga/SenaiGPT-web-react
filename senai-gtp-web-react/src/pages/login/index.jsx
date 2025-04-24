import "./login.css";
import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLoginClick = async () => {


        let emailValid = validarEmail(email);
        console.log(emailValid);

        if (email == "" || password == "") {
            alert("Email não informado");
        } else if (emailValid == false) {
            alert("Email inválido. Tente novamente");
        } else {
            let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {

                headers: {
                    "content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            console.log(response);

            if (response.ok == true) {

                alert("Login realizado com sucesso");

                let json = await response.json();

                let token = json.accessToken;

                console.log("Token: " + token);

                // GUARDAR INFORMAÇÃO NA PAGINA
                localStorage.setItem("meuToken", token);

                //COOKIES PARA DEFINIR A EXPIRAÇÃO DO TOKEN

                // Function setCookie(name, value, days); {
                //     const date = name Date();
                //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // dias ==> ms
                //     const expires  "expires=" + date.toUTCString();
                //     document.cookie = '${name}=${value}; ${expires}; path=';
                // }

                // setCookie("meuToken", token, 7);

                window.location.href = "/Chat"

            } else {

                if (response.status == 401) {

                    alert("Credenciais incorretas. Tente novamente");

                } else {

                    alert("Erro inesperado aconteceu, caso persista contate os administradores.");
                }
            }
        }
    }



    return (
        <>

            <header></header>

            <main className="page-container">

                <div className="robo-image">

                </div>

                <div className="login-container">

                    <img className="logo" src={logo} alt="Logo do SenaiGPT" />

                    <h1>Login</h1>

                    <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o e-mail" />
                    <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira a senha" />

                    <button className="btn" onClick={() => onLoginClick()}>Entrar</button>

                </div>

            </main>

            <footer></footer>

        </>
    )
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

}


export default Login;
