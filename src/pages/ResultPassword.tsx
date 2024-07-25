import React from "react";
import logo from "../img/logo.png";
import keyIcon from "../img/key-icon.png";
import { useNavigate } from "react-router-dom";

const ResultPassword = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");

  return (
    <div className="auth-acc">
      <img src={logo} alt="" className="logo" style={{ marginLeft: "-30px" }} />
      <img src={keyIcon} alt="" style={{ width: "70px", marginTop: "20px",  }} />
      <h2 style={{marginTop: "-30px"}}>Ваш пароль сброшен</h2>
      <p style={{ fontSize: "20px", marginTop: "-30px" }}>
        На ваш email отправлен новый пароль для входа
      </p>
      <span style={{ fontSize: "15px", marginTop: "-40px" }}>
        Письмо может быть в спаме
      </span>
      <button className="auth-btn" style={{marginTop: "-20px"}} onClick={() => navigate(`/${id}/profile`)}>На главную</button>
    </div>
  );
};

export default ResultPassword;
