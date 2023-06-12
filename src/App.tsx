import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import TodoList from "./pages/todoList";
import "./index.css";
import Header from "./components/Header/header";
import Main from "./pages/main";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
