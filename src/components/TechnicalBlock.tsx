import React, { useState } from "react";
import { DetailsType } from "../types";
import iconCircle from "../img/small-circle-icon.png";
import iconPazzle from "../img/small-pazzle-icon.png";
import iconBrilliant from "../img/small-brilliant-icon.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import { accountDetails } from "../store/actions/account.action";

const TechnicalBlock = () => {
  const { account } = useAppSelector((state) => state.accounts);
  const accountId = localStorage.getItem("currentAccount");
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("accountData");
  const [dmmState, setDmmState] = useState(null);
  const [transferState, setTransferState] = useState(null);
  const [emailState, setEmailState] = useState(null);
  const [isInputActive, setIsInputActive] = useState(false);
  const [newData, setNewData] = useState<DetailsType>({
    owners: "",
    seal: "",
    puzzle: "",
    crystals: "",
    unlockS: "",
    unlockA: "",
    author: "",
  });
  const [value, setValue] = useState("");

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

  const handleNewDataChange = (e: any) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setNewData({ ...newData, [name]: value });
      setValue(value);
    }
    setIsInputActive(true);
  };

  const handleDetailsSubmit = async () => {
    if (accountId && account) {
      await dispatch(accountDetails({ data: newData, account }));
      setIsInputActive(false);

      setNewData({
        owners: "",
        seal: "",
        puzzle: "",
        crystals: "",
        unlockS: "",
        unlockA: "",
        author: "",
      });
    }
  };

  return (
    <div>
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
                <p>{getStateLabel(dmmState)}</p>
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
                    onClick={() => toggleState(transferState, setTransferState)}
                  >
                    <div className="toggle-circle" />
                  </div>
                  <span>Transfer</span>
                </div>
                <p>{getStateLabel(transferState)}</p>
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
                <p>{getStateLabel(emailState)}</p>
              </div>
            </div>
          </div>

          <div className="owners">
            <h2>Владельцы</h2>
            <div className="owners-input-block">
              <h5>Количество владельцев</h5>
              <input
                type="text"
                name="owners"
                value={newData.owners}
                onChange={handleNewDataChange}
              />
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
                <input
                  type="text"
                  name="seal"
                  value={newData.seal}
                  onChange={handleNewDataChange}
                />
              </div>

              <div className="wrapp">
                <div className="header-wrapper">
                  <h6>Пазлы</h6>
                  <img src={iconPazzle} alt="" />
                </div>
                <input
                  type="text"
                  name="puzzle"
                  value={newData.puzzle}
                  onChange={handleNewDataChange}
                />
              </div>

              <div className="wrapp" id="crs">
                <div className="header-wrapper">
                  <h6>Кристаллы</h6>
                  <img src={iconBrilliant} alt="" />
                </div>
                <input
                  type="text"
                  name="crystals"
                  value={newData.crystals}
                  onChange={handleNewDataChange}
                />
              </div>

              <div className="wrapp" id="s-card">
                <div className="header-wrapper">
                  <h6>Анлок карты S</h6>
                </div>
                <input
                  type="text"
                  name="unlockS"
                  value={newData.unlockS}
                  onChange={handleNewDataChange}
                />
              </div>

              <div className="wrapp" id="a-card">
                <div className="header-wrapper">
                  <h6>Анлок карты A</h6>
                </div>
                <input
                  type="text"
                  name="unlockA"
                  value={newData.unlockA}
                  onChange={handleNewDataChange}
                />
              </div>
            </div>
            {isInputActive && (
              <button
                onClick={handleDetailsSubmit}
                className="auth-btn"
                style={{ marginTop: "20px" }}
              >
                Отправить детали
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TechnicalBlock;
