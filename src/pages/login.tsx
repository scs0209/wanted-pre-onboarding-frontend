/* eslint-disable */
import axios from "axios";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import "../styles/loginStyle.css";
import { backUrl } from "../config";
import CustomButton from "../components/button";

const LogIn = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [signInError, setSignInError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!email.includes("@")) {
        setValidationError("유효한 이메일 주소를 입력해주세요.");
        setDisabled(true);
        return;
      }

      if (password.length < 8) {
        setValidationError("비밀번호는 최소 8자 이상이어야 합니다.");
        setDisabled(true);
        return;
      }

      axios
        .post(`${backUrl}/auth/signin`, {
          email,
          password,
        })
        .then((response) => {
          const token = response.data.access_token;
          localStorage.setItem("token", token);
          navigate("/todo");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setSignInError(error.response.data.message);
        });
    },
    [email, password]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className="login-container">
      <form className="xs:p-0 login-form">
        <h1 className="title">Log In</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="email-label">E-mail</label>
            <input
              type="email"
              name="email"
              onChange={onChangeEmail}
              value={email}
              className="input-email"
              data-testid="email-input"
              placeholder="write your Email"
            />
            <label className="password-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={onChangePassword}
              value={password}
              className="input-password"
              data-testid="password-input"
              placeholder="***********"
            />
            {signInError && (
              <div className="mb-3 text-red-600 font-bold">{signInError}</div>
            )}
            {validationError && (
              <div className="mb-3 text-red-600 font-bold">
                {validationError}
              </div>
            )}
            <CustomButton
              type="submit"
              onClick={handleLogin}
              disabled={disabled}
              testId="signin-button"
            >
              <span className="inline-block mr-2">Login</span>
            </CustomButton>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <div className="mx-2 px-4 py-4 font-normal text-sm rounded-lg text-gray-500 ">
                  <span className="inline-block ml-1">
                    You don't have an account?
                  </span>
                  <Link
                    to="/signup"
                    className="transition duration-200 ml-12 px-5 py-4 cursor-pointer font-bold text-sm rounded-lg text-blue-500 hover:bg-gray-100 hover:text-red-400 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                  >
                    <span className="inline-block ml-1">Sign up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="transition duration-200 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <Link to="/" className="inline-block ml-1">
                  Go back
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
