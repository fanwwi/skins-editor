import React, { useEffect, useState } from "react";
import { AccountChange } from "../types";
import editIcon from "../img/edit-icon2.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateAccount } from "../store/actions/account.action";
import { useNavigate } from "react-router-dom";

const AccountData = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setGameAccount(account?.gameAccount || "");
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [gameAccount, setGameAccount] = useState("");
  const accountId = localStorage.getItem("currentAccount");
  const { account } = useAppSelector((state) => state.accounts);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "gameAccount") {
      setGameAccount(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [formData, setFormData] = useState<AccountChange>({
    game: "",
    gameId: "",
    gameNickname: "",
    gameAccount: "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (accountId) {
      await dispatch(updateAccount(accountId, { ...formData, gameAccount }));
      setIsEditing(false);
    }
  };

  return (
    <div className="details-block">
      <div className="right">
        <div className="text-block">
          <div className="account-name">
            {!isEditing ? (
              <h2>
                Детали аккаунта -{" "}
                <span className="blue-text">
                  {gameAccount || "Ошибка сети"}
                </span>
              </h2>
            ) : (
              <h2>
                Детали аккаунта -{" "}
                <input
                  type="text"
                  name="gameAccount"
                  value={gameAccount}
                  className="auth__input"
                  onChange={handleInputChange}
                />
              </h2>
            )}
          </div>
          <p className="p">В этой форме вы редактируете аккаунт</p>
          {!isEditing ? (
            <>
              <span>{account?.game || "Ошибка сети"}</span>
              <span>{account?.gameId || "Ошибка сети"}</span>
              <span>{account?.gameNickname || "Ошибка сети"}</span>
              <button onClick={handleEditClick} className="blue-btn">
                <img src={editIcon} alt="" />
              </button>
            </>
          ) : (
            <>
              <span>{account?.game || "Ошибка сети"}</span>
              <span>{account?.gameId || "Ошибка сети"}</span>
              <input
                type="text"
                name="gameNickname"
                value={formData.gameNickname}
                className="auth__input"
                onChange={handleInputChange}
              />
              <button onClick={handleSaveClick}>Сохранить</button>
            </>
          )}
        </div>
      </div>
      <div
        className="visual-card"
        onClick={() => navigate(`/editor/${accountId}`)}
      >
        Создать визуальную карточку аккаунта
      </div>
    </div>
  );
};

export default AccountData;
