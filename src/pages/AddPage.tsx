import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import userIcon from "../img/user-image.jpg";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  createAccount,
  getGames,
  getServers,
} from "../store/actions/account.action";
import { AccountType } from "../types";

const AddPage: React.FC = () => {
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const { allGames, allServers } = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalServerOpen, setModalServerOpen] = useState(false);

  const [formData, setFormData] = useState<AccountType>({
    game: "",
    gameId: "",
    gameNickname: "",
    gameServer: "",
    gameAccount: "",
    author: "",
    id: Number(""),
  });

  const handleSubmitt = async (e: React.FormEvent) => {
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
        id: Number(""),
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

  const handleGameSelect = (game: string) => {
    setFormData((prev) => ({
      ...prev,
      game,
    }));
    setModalOpen(false);
  };

  const handleServerSelect = (server: string) => {
    setFormData((prev) => ({
      ...prev,
      gameServer: server,
    }));
    setModalServerOpen(false);
  };

  useEffect(() => {
    dispatch(getGames());
    dispatch(getServers());
  }, [dispatch]);

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
          <img src={logo} alt="logo" className="logo12" />
          <Link
            to={`/${id}/profile`}
            style={{ color: "#6232ff" }}
            className="nadpis"
          >
            Мои аккаунты
          </Link>
        </div>
        <img
          src={userIcon}
          alt="userIcon"
          style={{cursor: "pointer" }}
          className="logo12"
          id="userIcon"
        />
      </div>

      <form className="auth-form" onSubmit={handleSubmitt}>
        <h2>Добавить аккаунт</h2>
        <label htmlFor="game" className="label-input">
          Название игры
        </label>
        <input
          type="text"
          className="auth__inputt"
          id="game"
          value={formData.game}
          onClick={() => setModalOpen(true)}
          readOnly
        />
        <label htmlFor="gameId" className="label-input">
          ID игрового аккаунта
        </label>
        <input
          type="text"
          className="auth__inputt"
          id="gameId"
          onChange={handleInputChange}
          value={formData.gameId}
        />
        <label htmlFor="gameNickname" className="label-input">
          Никнэйм
        </label>
        <input
          type="text"
          className="auth__inputt"
          id="gameNickname"
          onChange={handleInputChange}
          value={formData.gameNickname}
        />
        <label htmlFor="gameServer" className="label-input">
          Сервер
        </label>
        <input
          type="text"
          className="auth__inputt"
          id="gameServer"
          onClick={() => setModalServerOpen(true)}
          value={formData.gameServer}
          readOnly
        />
        <label htmlFor="gameAccount" className="label-input">
          Придумайте имя аккаунту
        </label>
        <input
          type="text"
          className="auth__inputt"
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

      {modalOpen && (
        <div className="modal-open" onClick={() => setModalOpen(false)}>
          <div className="modal-open__content">
            {allGames && allGames.length > 0 ? (
              allGames.map((game) => (
                <div
                  key={game.name}
                  className="one-game"
                  onClick={() => handleGameSelect(game.name)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={game.img} alt={game.name} />
                  <span>{game.name}</span>
                </div>
              ))
            ) : (
              <p>Нет доступных игр</p>
            )}
          </div>
        </div>
      )}

      {modalServerOpen && (
        <div className="modal-open" onClick={() => setModalServerOpen(false)}>
          <div className="modal-open__content">
            {allServers && allServers.length > 0 ? (
              allServers.map((server) => (
                <div
                  key={server.name}
                  className="one-game"
                  onClick={() => handleServerSelect(server.name)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={server.img} alt={server.name} />
                  <span>{server.name}</span>
                </div>
              ))
            ) : (
              <p>Нет доступных серверов</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPage;
