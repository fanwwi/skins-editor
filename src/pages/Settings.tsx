import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import userIcon from "../img/user-image.jpg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCurrentUser, changePassword } from "../store/actions/user.action";

const Settings: React.FC = () => {
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const { currentUser, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getCurrentUser(id));
    }
  }, [dispatch, id]);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Новые пароли не совпадают");
      return;
    }

    if (id) {
      dispatch(
        changePassword({
          userId: id,
          oldPassword,
          newPassword,
        })
      )
        .unwrap()
        .then(() => {
          console.log("Пароль успешно изменен");
          navigate(`/${id}/profile`);
        })
        .catch((error) => {
          console.error("Ошибка при смене пароля:", error);
          setPasswordError("Ошибка при смене пароля");
        });
    }
  };

  return (
    <div className="auth">
      <div
        className="profile-header"
        style={{
          marginTop: "-100px",
          width: "1500px",
          justifyContent: "space-between",
        }}
      >
        <div className="profile-left">
          <img src={logo} alt="" style={{ width: "70px" }} />
          <Link
            to={`/${id}/profile`}
            style={{ fontSize: "18px", color: "#6232ff" }}
          >
            Мои аккаунты
          </Link>
        </div>
        <img
          src={userIcon}
          alt="userIcon"
          style={{ width: "70px", cursor: "pointer" }}
        />
      </div>
      <form className="auth-form" onSubmit={handleChangePassword}>
        <h2>Аккаунт</h2>
        <p style={{ marginTop: "-15px" }}>
          {currentUser ? currentUser.email : "Ошибка!"}
        </p>
        <span style={{ fontWeight: "500", fontSize: "15px" }}>
          {currentUser ? currentUser.nickname : "Ошибка!"}
        </span>
        <span
          style={{ fontWeight: "600", fontSize: "15px", marginBottom: "10px" }}
        >
          Смена пароля
        </span>
        <label htmlFor="oldPassword" className="label-input">
          Старый пароль
        </label>
        <input
          type="password"
          className="auth__inputt"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor="newPassword" className="label-input">
          Новый пароль
        </label>
        <input
          type="password"
          className="auth__inputt"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor="confirmNewPassword" className="label-input">
          Новый пароль повторно
        </label>
        <input
          type="password"
          className="auth__inputt"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button type="submit" className="auth-btn">
          Сменить пароль
        </button>
      </form>
    </div>
  );
};

export default Settings;
