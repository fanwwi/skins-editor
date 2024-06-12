import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    if (email === "") {
      e.preventDefault();
      setError("Заполните поле");
    } else {
      setError("");
    }
  };

  return (
    <div className="auth">
      <img src={logo} alt="" className="logo" style={{ marginLeft: "-30px" }} />
      <h2>Восстановление пароля</h2>
      <span
        style={{ fontSize: "15px", marginBottom: "-40px", fontWeight: "500" }}
      >
        Введите ваш email
      </span>
      <input
        type="email"
        className="auth__input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          borderColor: error ? "red" : "#c6c6c6",
          marginBottom: "-30px",
        }}
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
      <Link to="/result" onClick={handleSubmit}>
        <button className="auth-btn">Отправить</button>
      </Link>
        <p style={{marginTop: "-30px"}}>Вспомнили пароль?</p>
        <Link to="/" style={{ marginTop: "-45px"}}>
          Войти
        </Link>
    </div>
  );
};

export default ForgotPassword;
