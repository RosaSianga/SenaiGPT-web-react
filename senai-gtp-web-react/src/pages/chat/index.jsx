import "./chat.css";
import imgChat from "../../assets/imgs/chat.svg";
import imgChatWhite from "../../assets/imgs/chat-white.svg";
import lixeira from "../../assets/imgs/lixeira.svg";
import lixeiraWhite from "../../assets/imgs/lixeira-white.svg";
import sol from "../../assets/imgs/sol.svg";
import solWhite from "../../assets/imgs/sol-white.svg";
import user from "../../assets/imgs/user.svg";
import userWhite from "../../assets/imgs/user-white.svg";
import setaLado from "../../assets/imgs/seta_lado.svg";
import setaLadoWhite from "../../assets/imgs/seta_lado-white.svg";
import imgChatGPT from "../../assets/imgs/ChatGPT.png";
import imgChatGPTWhite from "../../assets/imgs/ChatGPT-white.png";
import chatVazio from "../../assets/imgs/chat_vazio.svg";
import chatVazioWhite from "../../assets/imgs/chat_vazio-white.svg";
import estrela from "../../assets/imgs/estrela.svg";
import estrelaWhite from "../../assets/imgs/estrela-white.svg";
import escudo from "../../assets/imgs/escudo.svg";
import escudoWhite from "../../assets/imgs/escudo-white.svg";
import microfone from "../../assets/imgs/microfone.svg";
import microfoneWhite from "../../assets/imgs/microfone-white.svg";
import image from "../../assets/imgs/image.svg";
import imageWhite from "../../assets/imgs/image-white.svg";
import seta from "../../assets/imgs/seta.svg";
import setaWhite from "../../assets/imgs/seta-white.svg";

import { useEffect, useState } from "react";


function Chat() {

    const [chats, setChats] = useState([]);
    const [chatSelecionado, setchatSelecionado] = useState(null);
    const [userMessage, setUserMessage] = useState("");

    const [flagOpen, setFlagOpen] = useState(false);
    const [flagDarkMode, setFlagDarkMode] = useState(false);


    useEffect(() => {
        // Executa toda vez que a tela abre.

        getChats();

        let modoEscuro = localStorage.getItem("dark-mode");
        if (modoEscuro === "true") {
            setFlagDarkMode(true);
            document.body.classList.add("dark-mode");
        }


    }, []);

    const getChats = async () => {


        let response = await fetch("https://senai-gpt-api.up.railway.app/chats", {
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

    const onLogoutClick = () => {

        localStorage.clear();
        window.location.href = "/login";

    }

    const clickChat = (chat) => {
        setchatSelecionado(chat);
        setFlagOpen(false);

    }

    const newChat = async () => {

        let titulo = prompt("Insira o titulo do chat");

        if (titulo == null || titulo == "") {
            alert("Insira um titulo");
            return;
        }

        let userId = localStorage.getItem("meuId");

        let estuturaChat = {
            chatTitle: titulo,
            id: crypto.randomUUID(),
            userId: userId,
            messages: []
        };


        let response = await fetch("https://senai-gpt-api.up.railway.app/chats", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            },
            body: JSON.stringify(
                estuturaChat
            )
        });

        console.log(response);

        if (response.ok == true) {
            alert("Criado com sucesso");
            await getChats();
        } else {
            alert("Chat não criado");
        }

    }

    const deleteChat = async () => {

        let response = await fetch("https://senai-gpt-api.up.railway.app/chats/" + chatSelecionado.id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            }
        });


        if (response.ok == true) {
            alert("Deletado com sucesso");
            await getChats();
        } else {
            alert("Chat não deletado");
        }

    }

    const myAccountClick = () => {

        window.location.href = "/myAccount";

    }

    const chatGPT = async (message) => {

        return "Chat ok";

        // Configurações do endpoint e chave da API
        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "";
        const deploymentId = "gpt-4"; // Nome do deployment no Azure OpenAI
        const apiVersion = "2024-05-01-preview"; // Verifique a versão na documentação

        // URL para a chamada da API
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

        // Configurações do corpo da requisição
        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };

        // Cabeçalhos da requisição
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        // Faz a requisição com fetch
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            return botMessage;
        }

    }

    const enviarMensagem = async (message) => {

        console.log("Mensagem: ", message);

        let userId = localStorage.getItem("meuId");

        let novaMensagemUsuario = {
            text: message,
            id: crypto.randomUUID(),
            userId: userId
        };

        let novoChatSelecionado = { ...chatSelecionado };
        novoChatSelecionado.messages.push(novaMensagemUsuario);

        let respostaGPT = await chatGPT(message);

        let novaRespostaChatGPT = {
            text: respostaGPT,
            id: crypto.randomUUID(),
            userId: "chatbot"
        };

        novoChatSelecionado.messages.push(novaRespostaChatGPT);
        setchatSelecionado(novoChatSelecionado);

        let response = await fetch("https://senai-gpt-api.up.railway.app/chats/" + chatSelecionado.id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "content-type": "application/json"
            },
            body: JSON.stringify(
                novoChatSelecionado
            )
        });

        if (response.ok == false) {
            console.log("salvar o chat deu errado");
        }

        setUserMessage("");

    }

    const onKeyUp = (event) => {

        if (event.key == "Enter") {

            enviarMensagem(userMessage);

        }

    }

    const onclickDarkMode = () => {

        setFlagDarkMode(!flagDarkMode);
        if(flagDarkMode == true){
            document.body.classList.remove("dark-mode");
        } else {
            document.body.classList.add("dark-mode");
        }

        localStorage.setItem("dark-mode", !flagDarkMode);

    }

    return (
        <>

            <div className="tela">

                <button className="btn-panel" onClick={() => setFlagOpen(!flagOpen)}>
                    ☰
                </button>

                <header className={`chat ${flagOpen == true ? "open" : ""}`}>

                    <div className="superior">

                        <button className="btnchat" type="button" onClick={() => newChat()} > + New chat </button>

                        {chats.map(chat => (

                            <button className="botoes" type="button" onClick={() => clickChat(chat)}>
                                <img src={flagDarkMode == true? imgChatWhite : imgChat} alt="Imagem chat" />
                                {chat.chatTitle}
                            </button>

                        ))}


                    </div>


                    <div className="inferior">

                        <button className="botoes" type="button" onClick={() => deleteChat()}>
                            <img src={flagDarkMode == true? lixeiraWhite : lixeira}  alt="Imagem lixeira" />
                            Delete chat
                        </button>

                        <button className="botoes" type="button" onClick={() => onclickDarkMode()}>
                            <img src={flagDarkMode == true? solWhite : sol}  alt="Imagem ligth mode" />
                            Ligth mode
                        </button>

                        <button className="botoes" type="button" onClick={() => myAccountClick()}>
                            <img src={flagDarkMode == true? userWhite : user}  alt="Imagem My account" />
                            My account
                        </button>

                        <button className="botoes" type="button" onClick={() => onLogoutClick()}>
                            <img src={flagDarkMode == true? setaLadoWhite : setaLado}  alt="Imagem logout" />
                            Log out
                        </button>

                    </div>


                </header>

                <main>

                    <div className="principal">

                        {chatSelecionado == null && (
                            <>


                                <img className="imagem" src={flagDarkMode == true? imgChatGPTWhite : imgChatGPT}  alt="Logo SenaiGPT" />


                                <div className="tabela">

                                    <div className="btngrupo">
                                        <h1>
                                            <img src={flagDarkMode == true? chatVazioWhite : chatVazio}  alt="Imagem chat" />
                                            Examples
                                        </h1>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                    </div>


                                    <div className="btngrupo">
                                        <h1>
                                            <img src={flagDarkMode == true? estrelaWhite : estrela}  alt="Imagem chat" />
                                            Capalities
                                        </h1>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                    </div>


                                    <div className="btngrupo">
                                        <h1>
                                            <img src={flagDarkMode == true? escudoWhite : escudo} alt="Imagem chat" />
                                            Limitions
                                        </h1>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                        <button className="botao" type="button">Explain Quantum Computing insimple terms</button>
                                    </div>

                                </div>

                            </>
                        )}

                        {chatSelecionado != null && (

                            <>

                                <div className="chat-container">

                                    <div className="chat-header">

                                        <h2>{chatSelecionado.chatTitle}</h2>

                                    </div>

                                    <div className="chat-messages">

                                        {
                                            chatSelecionado.messages.map(message => (

                                                <p className={"message-item " + (message.userId == "chatbot" ? "chatbot" : "")}>{message.text}</p>
                                            ))}

                                    </div>

                                </div>

                            </>

                        )}


                        <div className="pesquisa">

                            <img src={flagDarkMode == true? microfone : microfone}  alt="Imagem microfone" />
                            <img src={flagDarkMode == true? image : image}  alt="Imagem foto" />

                            <input onKeyUp={event => onKeyUp(event)} className="input" value={userMessage} onChange={event => setUserMessage(event.target.value)} type="text" placeholder="Type message" />

                            <img src={flagDarkMode == true? seta : seta}  alt="Imagem foto" onClick={() => enviarMensagem(userMessage)} />

                        </div>

                    </div>


                </main>

            </div>


        </>
    )
}





export default Chat;
