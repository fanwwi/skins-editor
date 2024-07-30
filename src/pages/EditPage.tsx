import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import userIcon from "../img/user-image.jpg";
import bottom from "../img/bottom.png";
import top from "../img/top.png";
import addCostumeImg from "../img/add-icon.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addUserAss,
  addUserCostume,
  deleteAss,
  getAssessoirs,
  getCostume,
  getOneAccount,
  getUserAss,
  getUserCostumes,
} from "../store/actions/account.action";
import { AccountChange, AssessoirsType, DetailsType } from "../types";
import TechnicalBlock from "../components/TechnicalBlock";
import AccountContent from "../components/AccountContent";
import del from "../img/delete-icon.png";
import AccountData from "../components/AccountData";

const EditPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOneAccount(accountId!));
    dispatch(getCostume());
    dispatch(getAssessoirs());
    dispatch(getUserCostumes(accountId!));
    dispatch(getUserAss(accountId!));
  }, [dispatch]);

  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const accountId = localStorage.getItem("currentAccount");
  const [activeMainTab, setActiveMainTab] = useState("accountData");
  const [activeSubTab, setActiveSubTab] = useState("costumes");
  const [inputStyle, setInputStyle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAss, setShowAss] = useState(false);
  const [formData, setFormData] = useState<AccountChange>({
    game: "",
    gameId: "",
    gameNickname: "",
    gameAccount: "",
  });

  const { account, details, allAssessoirs, userAss } = useAppSelector(
    (state) => state.accounts
  );

  const [newData, setNewData] = useState<DetailsType>({
    owners: "",
    seal: "",
    puzzle: "",
    crystals: "",
    unlockS: "",
    unlockA: "",
    author: "",
  });

  const [searchAss, setSearchAss] = useState("");
  const [isAssModalOpen, setIsAssModalOpen] = useState(false);

  useEffect(() => {
    if (account) {
      setFormData({
        game: account.game || "",
        gameId: account.gameId || "",
        gameNickname: account.gameNickname || "",
        gameAccount: account.gameAccount || "",
      });

      setNewData({
        owners: details?.owners || "",
        seal: details?.seal || "",
        puzzle: details?.puzzle || "",
        crystals: details?.crystals || "",
        unlockS: details?.unlockS || "",
        unlockA: details?.unlockA || "",
        author: account.id.toString() || "",
      });
    }
  }, [account, details]);

  const searchAssValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAss(e.target.value);
  };

  const filteresAssessoirs = allAssessoirs
    ? allAssessoirs.filter((ass) =>
        ass.character.toLowerCase().includes(searchAss.toLowerCase())
      )
    : [];

  const hasAss = filteresAssessoirs.length > 0 && searchAss.trim() !== "";

  const handleCloseModal = () => {
    setIsAssModalOpen(false);
  };

  const handleAssClick = (item: AssessoirsType) => {
    const selectedAss = {
      assessoir: item.assessoir,
      character: item.character,
      bigAuthor: item.bigAuthor,
      id: item.id,
    };
    dispatch(addUserAss({ data: selectedAss, id: accountId! }));
  };

  const handleToggleAss = () => {
    setShowAss(!showAss);
  };

  const handleDeleteAss = (id: string) => {
    dispatch(deleteAss(id));
  };

  const handleInputClick = () => {
    setIsModalOpen(true);
    setInputStyle({
      display: "none",
    });
  };

  const assStyle = {
    height: showAss ? "auto" : "100px",
    overflow: "hidden",
    transition: "height 0.3s ease",
    width: "1480px",
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
          <img src={logo} alt="" className="logo12" />
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
          style={{ cursor: "pointer" }}
          className="none"
        />
      </div>
      <hr />
      <div className="container prof">
        <AccountData />
        <div className="main-header">
          <div
            onClick={() => setActiveMainTab("accountData")}
            style={{
              fontWeight: activeMainTab === "accountData" ? "700" : "400",
              color: activeMainTab === "accountData" ? "#3c00ff" : "black",
              cursor: "pointer",
            }}
          >
            <h3>Данные аккаунта</h3>
            {activeMainTab === "accountData" && <hr />}
          </div>
          <div
            onClick={() => setActiveMainTab("accountContent")}
            style={{
              fontWeight: activeMainTab === "accountContent" ? "700" : "400",
              color: activeMainTab === "accountContent" ? "#3c00ff" : "black",
              cursor: "pointer",
            }}
          >
            <h3>Содержание аккаунта</h3>
            {activeMainTab === "accountContent" && <hr />}
          </div>
        </div>

        {activeMainTab === "accountData" && <TechnicalBlock />}

        {activeMainTab === "accountContent" && (
          <div>
            <div className="main-header">
              <div
                onClick={() => setActiveSubTab("costumes")}
                style={{
                  fontWeight: activeSubTab === "costumes" ? "700" : "400",
                  color: activeSubTab === "costumes" ? "#3c00ff" : "black",
                  cursor: "pointer",
                }}
              >
                <h3>Костюмы</h3>
                {activeSubTab === "costumes" && <hr />}
              </div>
              <div
                onClick={() => setActiveSubTab("accessories")}
                style={{
                  fontWeight: activeSubTab === "accessories" ? "700" : "400",
                  color: activeSubTab === "accessories" ? "#3c00ff" : "black",
                  cursor: "pointer",
                }}
              >
                <h3>Аксессуары</h3>
                {activeSubTab === "accessories" && <hr />}
              </div>
            </div>

            {activeSubTab === "costumes" && <AccountContent />}
            {activeSubTab === "accessories" && (
              <div className="container prof">
                {!isModalOpen && (
                  <>
                    <label
                      htmlFor=""
                      className="label-input"
                      style={{ fontSize: "16px" }}
                    >
                      Добавление аксессуаров
                    </label>
                    <br />
                    <br />
                    <input
                      type="text"
                      className="auth__input long"
                      placeholder="Поиск..."
                      onClick={handleInputClick}
                    />
                  </>
                )}

                <div className="all-costumes">
                  <div className="costumes" style={assStyle}>
                    <div className="top" onClick={handleToggleAss}>
                      <h2>Аксессуары</h2>
                      <img src={showAss ? bottom : top} alt="" />
                    </div>
                    <div className="res">
                      {showAss && (
                        <>
                          <img
                            src={addCostumeImg}
                            alt=""
                            className="addIcon"
                            onClick={() => {
                              setIsAssModalOpen(true);
                            }}
                          />
                          {userAss
                            ?.map((ass) => (
                              <div key={ass.id} className="one-costume">
                                <img src={ass.assessoir} alt="Costume" />
                                <span>Персонаж: {ass.character}</span>
                                <img
                                  src={del}
                                  className="delete"
                                  alt="Delete"
                                  style={{ height: "30px" }}
                                  onClick={() => handleDeleteAss(ass.id)}
                                />
                              </div>
                            ))
                            .reverse()}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {isModalOpen && (
                  <div
                    className="modal-overlay"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    <div className="modal">
                      <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          className="auth__input"
                          value={searchAss}
                          onChange={searchAssValue}
                          placeholder="Поиск..."
                          onClick={(e) => e.stopPropagation()}
                          id="search"
                        />
                      </div>
                      <div className="results">
                        {hasAss
                          ? filteresAssessoirs.map((ass: AssessoirsType) => (
                              <div
                                key={ass.id}
                                className="cost"
                                onClick={() => handleAssClick(ass)}
                              >
                                <img
                                  src={ass.assessoir}
                                  alt={`Costume ${ass.id}`}
                                />
                                <span>Персонаж: {ass.character}</span>
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                )}

                {isAssModalOpen && (
                  <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal">
                      <div className="resultss">
                        <h2>Выберите аксессуар:</h2>
                        <div className="res">
                          {allAssessoirs!.map((item) => (
                            <div
                              key={item.id}
                              className="cost"
                              onClick={() => handleAssClick(item)}
                            >
                              <img
                                src={item.assessoir}
                                alt={`Аксессуар ${item.id}`}
                              />
                              <span>Персонаж: {item.character}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPage;
