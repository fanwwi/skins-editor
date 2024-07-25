import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="auth-acc" style={{marginTop: "100px"}}>
      <img
        src={logo}
        alt=""
        className="logo"
        style={{ marginLeft: "-40px"}}
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
