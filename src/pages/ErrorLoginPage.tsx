import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="auth">
      <img
        src={logo}
        alt=""
        className="logo"
        style={{ marginLeft: "-70px", width: "300px" }}
      />
      <p style={{ fontSize: "20px", marginBottom: "-30px" }}>
        Ошибка входа! Попробуйте еще раз!
      </p>
      <Link to="/">
        <button className="auth-btn">Войти</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
