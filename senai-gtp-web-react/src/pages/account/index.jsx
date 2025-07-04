import "./account.css"
import imgChat from "../../assets/imgs/chat.svg";
import lixeira from "../../assets/imgs/lixeira.svg";
import sol from "../../assets/imgs/sol.svg";
import user from "../../assets/imgs/user.svg";
import setaCima from "../../assets/imgs/seta_cima.svg";
import setaLado from "../../assets/imgs/seta_lado.svg";
import logo from "../../assets/imgs/Chat.png";
import { useEffect, useState } from "react";


function Account() {
    const [chats, setChats] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");



    useEffect(() => {
        // Executa toda vez que a tela abre.

        getChats();

        getAccount();

    }, []);

    const getChats = async () => {

        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }

        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json(); //Pega a informação do back-end

            let userId = localStorage.getItem("meuId");

            json = json.filter(chat => chat.userId == userId);

            setChats(json);

        } else {
            if (response.status == 401);
            alert("Token Inválido. Faça o login novamente");
            localStorage.clear();
            window.location.href = "/login";
        }


    }

    const getAccount = async () => {

        let meuId = localStorage.getItem("meuId");
        let response = await fetch("https://senai-gpt-api.up.railway.app/users/" + meuId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            },
            method: "GET"
        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json(); //Pega a informação do back-end


            setEmail(json.email);
            setNome(json.name);
            setPassword(json.password);

            console.log(json);

        }


    }


    const onLogoutClick = () => {

        localStorage.clear();
        window.location.href = "/login";

    }

    const clickChat = () => {
        window.location.href = "/chat";

    }

    const myAccountClick = () => {

        window.location.href = "/myAccount";

    }

    const alterarSenha = async () => {

        debugger;
        let alteraPassword = {
            name: nome,
            email: email,
            password: newPassword
        };

        let meuId = localStorage.getItem("meuId");
        let response = await fetch("https://senai-gpt-api.up.railway.app/users/" + meuId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(
                alteraPassword
            )

        });

        if (response.ok == true) {
            alert("Senha alterada com sucesso!");
        }

    }

    return (
        <>

            <div className="tela">

                <header className="chat">

                    <div className="superior">

                        <button className="btnchat" type="button" onClick={() => clickChat()} > + New chat </button>

                        {chats.map(chat => (

                            <button className="botoes" type="button" onClick={() => clickChat()}>
                                <img src={imgChat} alt="Imagem chat" />
                                {chat.chatTitle}
                            </button>

                        ))}


                    </div>


                    <div className="inferior">

                        <button className="botoes" type="button">
                            <img src={lixeira} alt="Imagem lixeira" />
                            Clear conversation
                        </button>

                        <button className="botoes" type="button">
                            <img src={sol} alt="Imagem ligth mode" />
                            Ligth mode
                        </button>

                        <button className="botoes" type="button" onClick={() => myAccountClick()}>
                            <img src={user} alt="Imagem My account" />
                            My account
                        </button>

                        <button className="botoes" type="button">
                            <img src={setaCima} alt="Imagem update e FAQ" />
                            Updates & FAQ
                        </button>

                        <button className="botoes" type="button" onClick={() => onLogoutClick()}>
                            <img src={setaLado} alt="Imagem logout" />
                            Log out
                        </button>

                    </div>


                </header>

                <main>

                    <div className="principal">


                        <div className="login-container">

                            <img className="logo" src={logo} alt="Logo do SenaiGPT" />

                            <h1 className="titulo">My Account</h1>

                            <div className="dados">
                                <p>Nome : </p>
                                <input className="inpt" value={nome} onChange={event => setNome(event.target.value)} type="text" />
                                <p>Email :</p>
                                <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" />,
                                <p>Password :</p>
                                <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" />

                                <p>New Password :</p>
                                <input className="inpt" value={newPassword} onChange={event => setNewPassword(event.target.value)} type="password" />

                                <button className="btn" onClick={() => alterarSenha()}>Alterar Senha</button>
                            </div>
                        </div>

                    </div>


                </main>

            </div>


        </>
    )
}
export default Account;
