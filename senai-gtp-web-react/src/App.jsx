import Chat from "./pages/chat";
import Login from "./pages/login";
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <>

      {/* <Login/>
      <Chat/> */}

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App;


