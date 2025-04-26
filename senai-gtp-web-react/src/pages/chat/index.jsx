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
    const [chatSelecionado, setchatSelecionado] = useState(null);
    const [userMessage, setUserMessage] = useState("");


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

            let json = await response.json(); //Pega a informação do back-end

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

    }

    const myAccountClick = () => {

        window.location.href = "/myAccount";

    }

    const chatGPT = async (message) => {

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

        let resposta = await chatGPT(message);

        console.log("Resposta: ", resposta);

        let novaMensagemUsuario = {
            userId: "userId",
            text: message,
            id: 10
        };

        let novaRespostaChatGPT = {
            userId: "chatbot",
            text: resposta,
            id: 10
        }

        let novoChatSelecionado = { ...chatSelecionado}; //cópia do chat selecionado
        novoChatSelecionado.messages.push(novaMensagemUsuario); //Adicionando uma mensagem
        novoChatSelecionado.messages.push(novaRespostaChatGPT); //Adicionando uma mensagem

        setchatSelecionado(novoChatSelecionado);
              
    }

    return (
        <>

            <div className="tela">

                <header className="chat">

                    <div className="superior">

                        <button className="btnchat" type="button"> + New chat </button>

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

                        {chatSelecionado == null && (
                            <>


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

                            <img src={microfone} alt="Imagem microfone" />
                            <img src={image} alt="Imagem foto" />

                            <input className="input" value={userMessage} onChange={event => setUserMessage(event.target.value)} type="text" placeholder="Type message" />

                            <img src={seta} alt="Imagem foto" onClick={() => enviarMensagem(userMessage)} />

                        </div>

                    </div>


                </main>

            </div>


        </>
    )
}





export default Chat;
