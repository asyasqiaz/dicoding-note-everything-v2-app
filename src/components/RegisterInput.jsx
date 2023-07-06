import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    register({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <form onSubmit={onSubmitHandler} className="input-register">
            <label htmlFor="name">{locale === "id" ? "Nama" : "Name"}</label>
            <input
              id="name"
              type="text"
              placeholder={locale === "id" ? "Masukkan nama" : "Enter name"}
              value={name}
              onChange={onNameChange}
            />
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
              autoComplete="current-password"
              value={password}
              onChange={onPasswordChange}
            />
            <label htmlFor="confirmPassword">
              {locale === "id" ? "Konfirmasi Kata Sandi" : "Confirm Password"}
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder={
                locale === "id"
                  ? "Masukkan konfirmasi kata sandi"
                  : "Enter password confirmation"
              }
              autoComplete="current-password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
            <button>{locale === "id" ? "Daftar" : "Register"}</button>
          </form>
        );
      }}
    </LocaleConsumer>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
