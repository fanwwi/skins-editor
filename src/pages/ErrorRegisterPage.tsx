import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const ErrorRegisterPage = () => {
  return (
    <div className="auth">
      <img
        src={logo}
        alt=""
        className="logo"
        style={{ marginLeft: "-70px", width: "300px" }}
      />
      <p style={{ fontSize: "20px", marginBottom: "-30px" }}>
        Не удалось Зарегистрироваться! Попробуйте еще раз!
      </p>
      <Link to="/user/register">
        <button className="auth-btn">Зарегистрироваться</button>
      </Link>
    </div>
  );
};

export default ErrorRegisterPage;
