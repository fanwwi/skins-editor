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
import { Link, useNavigate } from "react-router-dom";
import {
  getAccounts,
  copyAccount,
  deleteAccount,
  getCard,
} from "../store/actions/account.action";
import { AccountType } from "../types";
import Loader from "../components/Loader";

const UserProfile = () => {
  const accountId = Number(localStorage.getItem("currentAccount"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.users);
  const { allAccounts, error } = useAppSelector((state) => state.accounts);
  const { loading } = useAppSelector((state) => state.users);
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const { userCard } = useAppSelector((state) => state.accounts);

  useEffect(() => {
    if (id) {
      dispatch(getCurrentUser(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getAccounts());
      dispatch(getCard(accountId.toString()!));
    }
  }, [dispatch]);

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

  const handleCopyAccount = (accountId: number) => {
    dispatch(copyAccount(accountId.toString()))
      .unwrap()
      .then((copiedAccount: AccountType) => {
        console.log("Аккаунт скопирован:", copiedAccount);
      })
      .catch((error) => {
        console.error("Ошибка при копировании аккаунта:", error);
      });
  };

  const handleDeleteAccount = (accountId: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот аккаунт?")) {
      dispatch(deleteAccount(accountId))
        .unwrap()
        .then(() => {
          console.log("Аккаунт удален");
        })
        .catch((error) => {
          console.error("Ошибка при удалении аккаунта:", error);
        });
    }
  };

  return (
    <div className="profile">
      <div className="profile-header prr">
        <img src={logo} alt="logo" className="logo12" />
        <img
          src={userIcon}
          alt="userIcon"
          className="logo12"
          style={{ cursor: "pointer" }}
          onClick={handleProfileClick}
        />
      </div>
      <hr className="hr" />
      <div className="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : filteredAccounts.length === 0 ? (
          <h1 className="h1Gray">Список аккаунтов пуст</h1>
        ) : (
          <>
            <h1>Список аккаунтов</h1>
            <div className="all-accs">
              <div className="acc-list">
                <span id="one">Игра</span>
                <span id="two">ID акканута</span>
                <span id="three">Никнэйм</span>
                <span id="four">Сервер</span>
                <span id="five">
                  Имя <span>акканута</span>
                </span>
              </div>
              {filteredAccounts
                .map((account: AccountType, index: any) => (
                  <div className="one-acc" key={index}>
                    <div className="acc-names">
                      <h4 id="h4">{account.game}</h4>
                      <div className="acc-cont">
                        <span id="span1">{account.gameId}</span>
                        <span id="span2">{account.gameNickname}</span>
                        <span id="span3">{account.gameServer}</span>
                        <span id="span4">{account.gameAccount}</span>
                      </div>
                    </div>
                    <div className="acc-icons">
                      <img
                        src={editIcon}
                        alt="edit"
                        onClick={() => {
                          localStorage.setItem("currentAccount", account.id.toString());
                          navigate(`/edit/${account.id}/`);
                        }}
                      />
                      <img
                        src={copyIcon}
                        alt="copy"
                        onClick={() => handleCopyAccount(Number(account.id))}
                        style={{ cursor: "pointer" }}
                      />
                      <img src={downloadIcon} alt="download" id="down" />
                      <img src={cardIcon} alt="card" />
                      <img
                        src={deleteIcon}
                        alt="delete"
                        onClick={() => handleDeleteAccount(Number(account.id))}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))
                .reverse()}
            </div>
          </>
        )}
      </div>
      <button
        className="auth-btn auth-btn12"
        onClick={() => navigate("/add-page/add-account")}
      >
        + Добавить аккаунт
      </button>
      {isModalOpen && (
        <div className="modal-style" ref={modalRef} onClick={handleModalClick}>
          <div className="modal-contentt">
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
            <Link to="/" style={{ all: "unset" }}>
              <div className="profile-icon">
                <img src={exitIcon} alt="" />
                <p>Выход</p>
              </div>
            </Link>

            <Link to={`/${id}/settings`} style={{ all: "unset" }}>
              <div className="profile-icon">
                <img src={settingsIcon} alt="" />
                <p>Настройки</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
