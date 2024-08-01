import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";
import userIcon from "../img/user-image.jpg";
import logo from "../img/logo.png";

const ProfileHeader = () => {
  const idUser = localStorage.getItem("currentUser");
  const { account } = useAppSelector((state) => state.accounts);

  return (
    <div
      className="profile-header"
      style={{
        width: "1500px",
        justifyContent: "space-between",
      }}
    >
      <div className="profile-left">
        <img src={logo} alt="" style={{ width: "70px" }} />
        <Link
          to={`/${idUser}/profile`}
          style={{ fontSize: "18px", color: "#6232ff" }}
        >
          Мои аккаунты
        </Link>
      </div>
      <h2>
        Визуальная карточка аккаунта -{" "}
        <span className="blue-text">
          {account?.gameAccount || "Ошибка сети"}
        </span>
      </h2>
      <img
        src={userIcon}
        alt="userIcon"
        style={{ width: "70px", cursor: "pointer" }}
      />
    </div>
  );
};

export default ProfileHeader;
