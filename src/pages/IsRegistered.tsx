import React from "react";
import logo from "../img/logo.png";
import emailIcon from "../img/email-icon.png";
import { Link } from "react-router-dom";

const IsRegistered = () => {
  return (
    <div className="auth">
      <img src={logo} alt="" className="logo" style={{ marginLeft: "-30px" }} />
      <img src={emailIcon} alt="" style={{ width: "70px" }} />
      <h1>Вы зарегистрированы!</h1>
      <p style={{ fontSize: "20px", marginTop: "-30px" }}>
        На ваш email отправлена ссылка для активации аккаунта
      </p>
      <span style={{ fontSize: "15px", marginTop: "-40px" }}>
        Письмо может быть в спаме
      </span>
      <Link to="/profile">
        <button className="auth-btn">Смотреть профиль</button>
      </Link>
    </div>
  );
};

export default IsRegistered;
