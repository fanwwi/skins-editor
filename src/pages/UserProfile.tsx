import React, { useState, useEffect, useRef } from "react";
import logo from "../img/logo.png";
import userIcon from "../img/user-image.jpg";
import editIcon from "../img/edit-icon.png";
import copyIcon from "../img/copy-icon.png";
import downloadIcon from "../img/download-icon.png";
import cardIcon from "../img/image-icon.png";
import deleteIcon from "../img/delete-icon.png";
import exitIcon from "../img/icon-exit.png";
import settingsIcon from "../img/icon-settings.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCurrentUser } from "../store/actions/user.action";
import { Link } from "react-router-dom";
import { getAccounts, copyAccount } from "../store/actions/account.action";
import { AccountType } from "../types";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.users);
  const { allAccounts, loading, error } = useAppSelector(
    (state) => state.accounts
  );
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");

  useEffect(() => {
    if (id) {
      dispatch(getCurrentUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(getAccounts());
    }
  }, [dispatch, id]);

  const filteredAccounts =
    allAccounts?.filter(
      (account: AccountType) => account.author === `\"${id}\"`
    ) || [];

  const handleProfileClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  const handleCopyAccount = (accountId: string) => {
    dispatch(copyAccount(accountId))
      .unwrap()
      .then((copiedAccount: AccountType) => {
        console.log("Аккаунт скопирован:", copiedAccount);
      })
      .catch((error) => {
        console.error("Ошибка при копировании аккаунта:", error);
      });
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={logo} alt="logo" className="logo" style={{ width: "70px" }} />
        <img
          src={userIcon}
          alt="userIcon"
          style={{ width: "70px", cursor: "pointer" }}
          onClick={handleProfileClick}
        />
      </div>
      <hr />
      <div className="container">
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredAccounts.length === 0 ? (
          <h1
            style={{
              marginTop: "150px",
              marginLeft: "500px",
              color: "#8c8c8c",
            }}
          >
            Список аккаунтов пуст
          </h1>
        ) : (
          <>
            <h1 style={{ marginTop: "30px" }}>Список аккаунтов</h1>
            <div className="all-accs">
              {filteredAccounts
                .map((account: AccountType, index: any) => (
                  <div className="one-acc" key={index}>
                    <div className="acc-names">
                      <h4>{account.game}</h4>
                      <span>{account.gameId}</span>
                      <span>{account.gameNickname}</span>
                      <span>{account.gameServer}</span>
                      <span>{account.gameAccount}</span>
                    </div>
                    <div className="acc-icons">
                      <img src={editIcon} alt="edit" />
                      <img
                        src={copyIcon}
                        alt="copy"
                        onClick={() => handleCopyAccount(account.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <img src={downloadIcon} alt="download" />
                      <img src={cardIcon} alt="card" />
                      <img src={deleteIcon} alt="delete" />
                    </div>
                  </div>
                ))
                .reverse()}
            </div>
          </>
        )}
      </div>
      <div>
        <Link to="/add-page/add-account">
          <button
            className="auth-btn"
            style={{ marginTop: "30px", marginLeft: "650px" }}
          >
            + Добавить аккаунт
          </button>
        </Link>
      </div>
      {isModalOpen && (
        <div className="modal-style" ref={modalRef} onClick={handleModalClick}>
          <div className="modal-content">
            <div className="modal-top">
              <img src={userIcon} alt="" style={{ width: "50px" }} />
              <div className="modal-top__name">
                <span>
                  {currentUser ? currentUser.nickname : "Ошибка сети!"}
                </span>
                <span style={{ fontSize: "10px" }}>
                  {currentUser ? currentUser.email : "Ошибка сети!"}
                </span>
              </div>
            </div>
            <div className="profile-icon">
              <img src={exitIcon} alt="" />
              <p>Выход</p>
            </div>
            <div className="profile-icon">
              <img src={settingsIcon} alt="" />
              <p>Настройки</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
