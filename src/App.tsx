import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import "./index.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
