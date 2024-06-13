import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const AccountActivate = () => {
  const id = localStorage.getItem("currentUser");
  return (
    <div className="auth">
      <img
        src={logo}
        alt=""
        className="logo"
        style={{ marginLeft: "-70px", width: "300px" }}
      />
      <p style={{ fontSize: "20px", marginBottom: "-30px" }}>
        Ваш аккаунт активирован!
      </p>
      <Link to={`/${id}/profile`}>
        <button className="auth-btn">Смотреть профиль</button>
      </Link>
    </div>
  );
};

export default AccountActivate;
