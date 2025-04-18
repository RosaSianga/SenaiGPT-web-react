import "./chat.css";
import chat from "../../assets/imgs/chat.svg";
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


function Chat() {

    return (
        <>

            <div class="tela">

                <header class="chat">

                    <div class="superior">

                        <button class="btnchat" type="button"> + New chat </button>

                        <button class="botoes" type="button">
                            <img src={chat} alt="Imagem chat" />
                            AI Chat Tool Ethics
                        </button>

                        <button class="botoes" type="button">
                            <img src={chat} alt="Imagem chat" />
                            AI Chat Tool Impact Writing
                        </button>

                        <button class="botoes" type="button">
                            <img src={chat} alt="Imagem chat" />
                            New chat
                        </button>

                    </div>


                    <div class="inferior">

                        <button class="botoes" type="button">
                            <img src={lixeira} alt="Imagem lixeira" />
                            Clear conversation
                        </button>

                        <button class="botoes" type="button">
                            <img src={sol} alt="Imagem ligth mode" />
                            Ligth mode
                        </button>

                        <button class="botoes" type="button">
                            <img src={user} alt="Imagem My account" />
                            My account
                        </button>

                        <button class="botoes" type="button">
                            <img src={setaCima} alt="Imagem update e FAQ" />
                            Updates & FAQ
                        </button>

                        <button class="botoes" type="button">
                            <img src={setaLado} alt="Imagem logout" />
                            Log out
                        </button>

                    </div>


                </header>

                <main>

                    <div class="principal">

                        <img class="imagem" src={chatGPT} alt="Logo SenaiGPT" />


                        <div class="tabela">

                            <div class="btngrupo">
                                <h1>
                                    <img src={chatVazio} alt="Imagem chat" />
                                    Examples
                                </h1>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                            </div>


                            <div class="btngrupo">
                                <h1>
                                    <img src={estrela} alt="Imagem chat" />
                                    Capalities
                                </h1>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                            </div>


                            <div class="btngrupo">
                                <h1>
                                    <img src={escudo} alt="Imagem chat" />
                                    Limitions
                                </h1>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                                <button class="botao" type="button">Explain Quantum Computing insimple terms</button>
                            </div>

                        </div>


                        <div class="pesquisa">

                            <img src={microfone} alt="Imagem microfone" />
                            <img src={image} alt="Imagem foto" />

                            <input class="input" type="text" placeholder="Type message" />

                            <img src={seta} alt="Imagem foto" />

                        </div>

                    </div>


                </main>

            </div>


        </>
    )
}

export default Chat;
