import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email: email,
      password: password,
    });
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <form onSubmit={onSubmitHandler} className="input-login">
            <label htmlFor="email">{locale === "id" ? "Surel" : "Email"}</label>
            <input
              id="email"
              type="email"
              placeholder={locale === "id" ? "Masukkan surel" : "Enter email"}
              value={email}
              onChange={onEmailChange}
            />
            <label htmlFor="password">
              {locale === "id" ? "Kata Sandi" : "Password"}
            </label>
            <input
              id="password"
              type="password"
              placeholder={
                locale === "id" ? "Masukkan kata sandi" : "Enter password"
              }
              value={password}
              onChange={onPasswordChange}
            />
            <button>{locale === "id" ? "Masuk" : "Login"}</button>
          </form>
        );
      }}
    </LocaleConsumer>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
