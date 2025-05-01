import Chat from "./pages/chat";
import Login from "./pages/login";
import Account from "./pages/account";
import Usuario from "./pages/usuario";
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {

  const isAuthenticated = () => {

    let token = localStorage.getItem("meuToken");

    if (token == null) {
      return false
    } else {
      return true;
    }
  }

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Chat" element={ isAuthenticated() == true? <Chat/> : <Login/>} />
          <Route path="/myAccount" element={<Account />} />
          <Route path="/new-user" element={<Usuario />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App;


