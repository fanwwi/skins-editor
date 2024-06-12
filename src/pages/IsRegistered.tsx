import React from "react";
import logo from "../img/logo.png";
import emailIcon from "../img/email-icon.png";

const IsRegistered = () => {
  return (
    <div className="auth">
      <img src={logo} alt="" className="logo" style={{marginLeft: "-30px"}}/>
      <img src={emailIcon} alt="" style={{width: "70px"}}/>
      <h1>Вы зарегистрированы!</h1>
      <p style={{fontSize: "20px", marginTop: "-30px"}}>На ваш email отправлена ссылка для активации аккаунта</p>
      <span style={{fontSize: "15px", marginTop: "-40px"}}>Письмо может быть в спаме</span>
      <button className="auth-btn">На главную</button>
    </div>
  );
};

export default IsRegistered;
