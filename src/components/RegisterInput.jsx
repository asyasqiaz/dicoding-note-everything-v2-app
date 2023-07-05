import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

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
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={name} onChange={onNameChange} />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        type="password"
        autoComplete="current-password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
