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
    const [chatSelecionado, setchatSelecionado] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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

            setChats(json);

        } else {
            if (response.status == 401);
            alert("Token Inválido. Faça o login novamente");
            localStorage.clear();
            window.location.href = "/login";
        }


    }

    const getAccount = async () => {

        let meuId = localStorage.getItem("meuToken");
        let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
            headers: {
                "content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: meuId
            })
        });

        console.log(response);


    }


    const onLogoutClick = () => {

        localStorage.clear();
        window.location.href = "/login";

    }

    const clickChat = (chat) => {
        window.location.href = "/chat";

    }

    const myAccountClick = () => {

        window.location.href = "/myAccount";

    }

    return (
        <>

            <div className="tela">

                <header className="chat">

                    <div className="superior">

                        {chats.map(chat => (

                            <button className="botoes" type="button" onClick={() => clickChat(chat)}>
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

                            <h1>My Account</h1>

                            <div className="dados">
                                <p>Nome : </p>
                                <input className="inpt" value={nome} onChange={event => setNome(event.target.value)} type="text" />
                                <p>Email :</p>
                                <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" />,
                                <p>Password :</p>
                                <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" />

                                {/* <button className="btn" onClick={() => onLoginClick()}>Entrar</button> */}
                            </div>
                        </div>

                    </div>


                </main>

            </div>


        </>
    )
}
export default Account;
