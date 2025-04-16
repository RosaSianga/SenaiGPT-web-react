import "./login.css";

function Login() {

    return (
        <>

            <header></header>

            <main className="page-container">

                <div className="robo-image">

                    {/* <img class="robo" src="../assets/imgs/Sidebar.png" alt="Robo">  */}

                </div>


                <div className="login-container">

                    <img className="logo" src="../assets/imgs/Chat.png" alt="Logo do SenaiGPT" />

                    {/* 
                        <Utilizado quando tem arquivo CSS, classe e id 
                        <h1 id="meutitulo" class="titulo">Login</h1> 

                        <Utilizado apenas no html -->
                        <h1 style="font-size: 76px;">Login</h1> 

                        <Utilizando a formação no CSS pela tag  */}

                    <h1>Login</h1>

                    <input className="inpt" type="email" placeholder="Insira o e-mail" />
                    <input className="inpt" type="password" placeholder="Insira a senha" />

                    <button className="btn">Entrar</button>

                </div>

            </main>

            <footer></footer>

        </>
    )
}

export default Login;
