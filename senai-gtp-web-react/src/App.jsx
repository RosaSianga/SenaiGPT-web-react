import Chat from "./pages/chat";
import Login from "./pages/login";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <>

      {/* <Login/>
      <Chat/> */}

      <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </Router>

    </>
  )
}

export default App;


