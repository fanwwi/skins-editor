import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import userIcon from "../img/user-image.jpg";
import editIcon from "../img/edit-icon.png";
import iconCircle from "../img/small-circle-icon.png";
import iconPazzle from "../img/small-pazzle-icon.png";
import iconBrilliant from "../img/small-brilliant-icon.png";

const EditPage = () => {
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const [activeTab, setActiveTab] = useState("accountData");
  const [dmmState, setDmmState] = useState(null);
  const [transferState, setTransferState] = useState(null);
  const [emailState, setEmailState] = useState(null);

  const toggleState = (state: any, setState: any) => {
    if (state === null) {
      setState(true);
    } else if (state === true) {
      setState(false);
    } else {
      setState(null);
    }
  };

  const getStateLabel = (state: any) => {
    if (state === null) {
      return "Null";
    } else if (state === true) {
      return "True";
    } else {
      return "False";
    }
  };

  return (
    <div>
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
      <hr />
      <div className="container">
        <div className="details-block">
          <div className="right">
            <div className="text-block">
              <h2>
                Детали аккаунта -{" "}
                <span className="blue-text">Имя аккаунта</span>
              </h2>
              <p>В этой форме вы редактируете аккаунт</p>
              <span>Игра</span>
              <span>Id game</span>
              <span>nickname</span>
              <button>Сохранить</button>
            </div>
            <img src={editIcon} alt="" />
          </div>
          <div className="visual-card">
            Создать визуальную карточку аккаунта
          </div>
        </div>
        <div className="main-header">
          <div
            onClick={() => setActiveTab("accountData")}
            style={{
              fontWeight: activeTab === "accountData" ? "700" : "400",
              color: activeTab === "accountData" ? "#3c00ff" : "black",
              cursor: "pointer",
            }}
          >
            <h3>Данные аккаунта</h3>
            {activeTab === "accountData" && <hr />}
          </div>
          <div
            onClick={() => setActiveTab("accountContent")}
            style={{
              fontWeight: activeTab === "accountContent" ? "700" : "400",
              color: activeTab === "accountContent" ? "#3c00ff" : "black",
              cursor: "pointer",
            }}
          >
            <h3>Содержание аккаунта</h3>
            {activeTab === "accountContent" && <hr />}
          </div>
        </div>

        {activeTab === "accountData" && (
          <>
            <div className="technical-block">
              <h2>Технические данные</h2>
              <select>
                <option>Операционная система</option>
                <option>IOS</option>
                <option>Android</option>
              </select>

              <div className="main-toggle">
                <div className="toggle">
                  <div className="block-left">
                    <div
                      className={`toggle-container ${
                        dmmState === null ? "null" : dmmState ? "true" : "false"
                      }`}
                      onClick={() => toggleState(dmmState, setDmmState)}
                    >
                      <div className="toggle-circle" />
                    </div>
                    <span>DMM</span>
                  </div>
                  <p>Пояснение в переключатель</p>
                </div>

                <div className="toggle">
                  <div className="block-left">
                    <div
                      className={`toggle-container ${
                        transferState === null
                          ? "null"
                          : transferState
                          ? "true"
                          : "false"
                      }`}
                      onClick={() =>
                        toggleState(transferState, setTransferState)
                      }
                    >
                      <div className="toggle-circle" />
                    </div>
                    <span>Transfer</span>
                  </div>
                  <p>Пояснение в переключатель</p>
                </div>

                <div className="toggle">
                  <div className="block-left">
                    <div
                      className={`toggle-container ${
                        emailState === null
                          ? "null"
                          : emailState
                          ? "true"
                          : "false"
                      }`}
                      onClick={() => toggleState(emailState, setEmailState)}
                    >
                      <div className="toggle-circle" />
                    </div>
                    <span>Email</span>
                  </div>
                  <p>Пояснение в переключатель</p>
                </div>
              </div>
            </div>

            <div className="owners">
              <h2>Владельцы</h2>
              <div className="owners-input-block">
                <h5>Количество владельцев</h5>
                <input type="text" id="owners-inp" />
              </div>
            </div>

            <div className="play-coin">
              <h2>Игровая валюта</h2>
              <div className="wrapper">
                <div className="wrapp">
                  <div className="header-wrapper">
                    <h6>Печать</h6>
                    <img src={iconCircle} alt="" />
                  </div>
                  <input type="text" />
                </div>

                <div className="wrapp">
                  <div className="header-wrapper">
                    <h6>Пазлы</h6>
                    <img src={iconPazzle} alt="" />
                  </div>
                  <input type="text" />
                </div>

                <div className="wrapp">
                  <div className="header-wrapper">
                    <h6>Кристаллы</h6>
                    <img src={iconBrilliant} alt="" />
                  </div>
                  <input type="text" />
                </div>

                <div className="wrapp">
                  <div className="header-wrapper">
                    <h6>Анлок карты S</h6>
                  </div>
                  <input type="text" />
                </div>

                <div className="wrapp">
                  <div className="header-wrapper">
                    <h6>Анлок карты A</h6>
                  </div>
                  <input type="text" />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "accountContent" && (
          <div>
            <h2>Содержание аккаунта</h2>
            <p>Здесь будет содержание аккаунта...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPage;
