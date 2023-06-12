import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import TodoList from "./pages/todoList";
import "./index.css";
import Main from "./pages/main";
import Header from "./components/Header/header";

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
