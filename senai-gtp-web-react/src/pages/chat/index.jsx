import "./chat.css";
import imgChat from "../../assets/imgs/chat.svg";
import lixeira from "../../assets/imgs/lixeira.svg";
import sol from "../../assets/imgs/sol.svg";
import user from "../../assets/imgs/user.svg";
import setaCima from "../../assets/imgs/seta_cima.svg";
import setaLado from "../../assets/imgs/seta_lado.svg";
import chatGPT from "../../assets/imgs/ChatGPT.png";
import chatVazio from "../../assets/imgs/chat_vazio.svg";
import estrela from "../../assets/imgs/estrela.svg";
import escudo from "../../assets/imgs/escudo.svg";
import microfone from "../../assets/imgs/microfone.svg";
import image from "../../assets/imgs/image.svg";
import seta from "../../assets/imgs/seta.svg";
import { useEffect, useState } from "react";


function Chat() {

    const [chats, setChats] = useState([]);


    useEffect(() => {
        // Executa toda vez que a tela abre.

        getChats();

    }, []);

    const getChats = async () => {

        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }

        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json();

            setChats(json);

        } else {
            if (response.status == 401);
            alert("Token Inválido. Faça o login novamente");
            window.location.href = "/login";
        }


    }

    return (
        <>

            <div className="tela">

                <header className="chat">

                    <div className="superior">

                        <button className="btnchat" type="button"> + New chat </button>

                        {chats.map(chat => (

                            <button className="botoes" type="button">
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

                        <button className="botoes" type="button">
                            <img src={user} alt="Imagem My account" />
                            My account
                        </button>

                        <button className="botoes" type="button">
                            <img src={setaCima} alt="Imagem update e FAQ" />
                            Updates & FAQ
                        </button>

                        <button className="botoes" type="button">
                            <img src={setaLado} alt="Imagem logout" />
                            Log out
                        </button>

                    </div>


                </header>

                <main>

                    <div className="principal">

                        <img className="imagem" src={chatGPT} alt="Logo SenaiGPT" />


                        <div className="tabela">

                            <div className="btngrupo">
                                <h1>
                                    <img src={chatVazio} alt="Imagem chat" />
                                    Examples
                                </h1>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                            </div>


                            <div className="btngrupo">
                                <h1>
                                    <img src={estrela} alt="Imagem chat" />
                                    Capalities
                                </h1>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                            </div>


                            <div className="btngrupo">
                                <h1>
                                    <img src={escudo} alt="Imagem chat" />
                                    Limitions
                                </h1>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                            </div>

                        </div>


                        <div className="pesquisa">

                            <img src={microfone} alt="Imagem microfone" />
                            <img src={image} alt="Imagem foto" />

                            <input className="input" type="text" placeholder="Type message" />

                            <img src={seta} alt="Imagem foto" />

                        </div>

                    </div>


                </main>

            </div>


        </>
    )
}

export default Chat;
