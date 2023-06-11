import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import TodoList from "./pages/todoList";
import "./index.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      navigate("/todo");
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
