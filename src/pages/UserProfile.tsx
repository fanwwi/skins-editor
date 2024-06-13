import React, { useState, useEffect, useRef, Profiler } from "react";
import logo from "../img/logo.png";
import userIcon from "../img/user-image.jpg";
import editIcon from "../img/edit-icon.png";
import copyIcon from "../img/copy-icon.png";
import downloadIcon from "../img/download-icon.png";
import cardIcon from "../img/image-icon.png";
import deleteIcon from "../img/delete-icon.png";
import exitIcon from "../img/icon-exit.png";
import settingsIcon from "../img/icon-settings.png";
import Loader from "../components/Loader";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/user.action";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const nickname = localStorage.getItem("nickname");
  const email = localStorage.getItem("email");

  useEffect(() => {
    setTimeout(() => {
      setAccounts([]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getCurrentUser(id</ProfileData>));
  }, [dispatch]);

  const handleProfileClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  if (isLoading) {
    return <Loader />;
  }

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
        {accounts.length === 0 ? (
          <>
            <h1
              style={{
                marginTop: "150px",
                marginLeft: "500px",
                color: "#8c8c8c",
              }}
            >
              Список аккаунтов пуст
            </h1>
          </>
        ) : (
          <>
            <h1 style={{ marginTop: "30px" }}>Список аккаунтов</h1>
            <div className="all-accs">
              {accounts.map((account, index) => (
                <div className="one-acc" key={index}>
                  <div className="acc-names">
                    <h4>account.name</h4>
                    <span>account.game</span>
                    <span>account.id</span>
                    <span>account.nickname</span>
                    <span>account.server</span>
                  </div>
                  <div className="acc-icons">
                    <img src={editIcon} alt="edit" />
                    <img src={copyIcon} alt="copy" />
                    <img src={downloadIcon} alt="download" />
                    <img src={cardIcon} alt="card" />
                    <img src={deleteIcon} alt="delete" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        <button
          className="auth-btn"
          style={{ marginTop: "30px", marginLeft: "650px" }}
        >
          + Добавить аккаунт
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-style" ref={modalRef} onClick={handleModalClick}>
          <div className="modal-content">
            <div className="modal-top">
              <img src={userIcon} alt="" style={{ width: "50px" }} />
              <div className="modal-top__name">
                <span>{nickname}</span>
                <span style={{ fontSize: "10px" }}>{email}</span>
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
