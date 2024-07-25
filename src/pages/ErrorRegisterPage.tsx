import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const ErrorRegisterPage = () => {
  return (
    <div className="auth-acc" style={{marginTop: "100px"}}>
      <img src={logo} alt="" className="logo" style={{ marginLeft: "-40px" }} />
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
