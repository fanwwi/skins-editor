import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import userIcon from "../img/user-image.jpg";
import { useAppDispatch } from "../store/store";
import { createAccount } from "../store/actions/account.action";
import { AccountType } from "../types";

const AddPage: React.FC = () => {
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AccountType>({
    game: "",
    gameId: "",
    gameNickname: "",
    gameServer: "",
    gameAccount: "",
    author: "",
    id: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAccount({ data: formData, navigate }));
      setFormData({
        game: "",
        gameId: "",
        gameNickname: "",
        gameServer: "",
        gameAccount: "",
        author: "",
        id: "",
      });
      navigate(`/${id}/profile`);
    } catch (error) {
      console.error("Ошибка при создании аккаунта:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
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

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Добавить аккаунт</h2>
        <label htmlFor="game" className="label-input">
          Название игры
        </label>
        <input
          type="text"
          className="auth__input"
          id="game"
          onChange={handleInputChange}
          value={formData.game}
        />
        <label htmlFor="gameId" className="label-input">
          ID игрового аккаунта
        </label>
        <input
          type="text"
          className="auth__input"
          id="gameId"
          onChange={handleInputChange}
          value={formData.gameId}
        />
        <label htmlFor="gameNickname" className="label-input">
          Никнэйм
        </label>
        <input
          type="text"
          className="auth__input"
          id="gameNickname"
          onChange={handleInputChange}
          value={formData.gameNickname}
        />
        <label htmlFor="gameServer" className="label-input">
          Сервер
        </label>
        <input
          type="text"
          className="auth__input"
          id="gameServer"
          onChange={handleInputChange}
          value={formData.gameServer}
        />
        <label htmlFor="gameAccount" className="label-input">
          Придумайте имя аккаунту
        </label>
        <input
          type="text"
          className="auth__input"
          id="gameAccount"
          onChange={handleInputChange}
          value={formData.gameAccount}
        />
        <div className="main-btns">
          <Link to={`/${id}/profile`}>
            <button type="button" className="auth-btn2">
              Назад
            </button>
          </Link>
          <button type="submit" className="auth-btn" style={{ width: "140px" }}>
            Создать аккаунт
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;
