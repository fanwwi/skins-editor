import React from "react";
import logo from "../img/logo.png";
import notFound from "../img/404.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="auth-acc">
      <img src={logo} alt="" className="logo" style={{ marginLeft: "-30px" }} />
      <img
        src={notFound}
        alt=""
        style={{ width: "500px", marginBottom: "-50px", marginTop: "-50px" }}
      />
      <p style={{ fontSize: "20px", marginBottom: "-30px" }}>
        Страница не найдена
      </p>
      <Link to="/">
        <button className="auth-btn">Войти</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
