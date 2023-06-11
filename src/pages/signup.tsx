import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { backUrl } from "../config";
import CustomButton from "../components/button";
import useInput from "../hooks/useInput";

const SignUp = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [signUpError, setSignUpError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = useCallback(
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
        .post(
          `${backUrl}/auth/signup`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert("회원가입이 완료되었습니다!");
            navigate("/signin");
          }
        })
        .catch((error) => {
          setSignUpError(error.response.data);
          console.log(error.response);
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
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChangeEmail}
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  data-testid="email-input"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={onChangePassword}
                  value={password}
                  data-testid="password-input"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              {signUpError && <div className="text-red-100">{signUpError}</div>}
              {validationError && (
                <div className="text-red-500">{validationError}</div>
              )}
              <CustomButton
                type="submit"
                onClick={handleSignUp}
                disabled={disabled}
                testId="signup-button"
              >
                Create an account
              </CustomButton>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
