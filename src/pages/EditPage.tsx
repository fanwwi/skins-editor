import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { Link, useParams } from "react-router-dom";
import userIcon from "../img/user-image.jpg";
import editIcon from "../img/edit-icon2.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  accountDetails,
  addUserCostume,
  deleteOneCostume,
  getCostume,
  getOneAccount,
  getUserCostumes,
  updateAccount,
} from "../store/actions/account.action";
import iconCircle from "../img/small-circle-icon.png";
import iconPazzle from "../img/small-pazzle-icon.png";
import iconBrilliant from "../img/small-brilliant-icon.png";
import { AccountChange, CostumesType, DetailsType } from "../types";
import del from "../img/delete-icon.png";
import { getCurrentUser } from "../store/actions/user.action";
import addCostumeImg from "../img/add-icon.png";

const EditPage = () => {
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const [activeTab, setActiveTab] = useState("accountData");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AccountChange>({
    game: "",
    gameId: "",
    gameNickname: "",
    gameAccount: "",
  });
  const [gameAccount, setGameAccount] = useState("");
  const { account } = useAppSelector((state) => state.accounts);
  const { details } = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accountId } = useParams();
  const [dmmState, setDmmState] = useState(null);
  const [transferState, setTransferState] = useState(null);
  const [emailState, setEmailState] = useState(null);

  const { allCostumes } = useAppSelector((state) => state.accounts);
  const { userCostumes } = useAppSelector((state) => state.accounts);

  const [costumes, setCostumes] = useState<CostumesType>({
    author: account ? account!.id : "",
    costume: "",
    category: "",
    bigAuthor: "",
    id: "",
  });
  const [newData, setNewData] = useState<DetailsType>({
    owners: "",
    seal: "",
    puzzle: "",
    crystals: "",
    unlockS: "",
    unlockA: "",
    author: "",
  });

  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    if (accountId) {
      dispatch(getOneAccount(accountId));
    }
  }, [dispatch, accountId]);

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
        author: account.id || "",
      });

      setGameAccount(account.gameAccount || "");
    }
  }, [account, details]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "gameAccount") {
      setGameAccount(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleInputCostumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCostumes({ ...costumes, [name]: value });
  };

  const handleCostumeSubmit = async () => {
    if (costumes) {
    }

    setCostumes({
      author: account!.id,
      costume: "",
      category: "",
      bigAuthor: "",
      id: "",
    });
    window.location.reload();
  };

  useEffect(() => {
    if (account) {
      dispatch(getCostume());
    }
  }, [dispatch, account]);

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
        author: account.id || "",
      });

      setGameAccount(account.gameAccount || "");
    }
  }, [account, details]);

  const handleNewDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });

    setIsInputActive(true);
  };

  const handleSaveClick = async () => {
    if (accountId) {
      await dispatch(updateAccount(accountId, { ...formData, gameAccount }));
      setIsEditing(false);
    }
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

  const navigateToProfile = () => {
    navigate(`${id}/profile`);
  };

  const handleDeleteAccount = (accountId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот костюм?")) {
      dispatch(deleteOneCostume(accountId))
        .unwrap()
        .catch((error) => {
          console.error("Ошибка при удалении аккаунта:", error);
        });
    }
  };

  const [isActive, setIsActive] = useState(false);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getCurrentUser(id));
    }
    if (account) {
      dispatch(getCostume());
    }
  }, [dispatch]);

  const searchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  const filteredCostumes = allCostumes
    ? allCostumes.filter((costume) =>
        costume.author.toLowerCase().includes(searchData.toLowerCase())
      )
    : [];

  const hasResults = filteredCostumes.length > 0 && searchData.trim() !== "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBigModalOpen, setIsBigModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsBigModalOpen(false);
  };
  const [inputStyle, setInputStyle] = useState({});

  const handleInputClick = () => {
    setIsModalOpen(true);
    setInputStyle({
      display: "none",
    });
  };

  const [clickedItem, setClickedItem] = useState<CostumesType>();
  const [selectedItem, setSelectedItem] = useState<CostumesType>();

  const handleItemClick = (item: CostumesType) => {
    const selectedItem = {
      costume: item.costume,
      author: item.author,
      bigAuthor: item.bigAuthor,
      category: item.category,
      id: item.id,
    };
    dispatch(addUserCostume({ data: selectedItem, id: account!.id }));
    setClickedItem(selectedItem);
    console.log(selectedItem);
  };

  useEffect(() => {
    if (account) {
      dispatch(getUserCostumes(account.id));
    }
  }, [dispatch, account]);
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
              <p>В этой форме вы редактируете аккаунт</p>
              {!isEditing ? (
                <>
                  <span>{account?.game || "Ошибка сети"}</span>
                  <span>{account?.gameId || "Ошибка сети"}</span>
                  <span>{account?.gameNickname || "Ошибка сети"}</span>
                  <button onClick={handleEditClick}>
                    <img src={editIcon} alt="" />
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="game"
                    value={formData.game}
                    className="auth__input"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="gameId"
                    value={formData.gameId}
                    className="auth__input"
                    onChange={handleInputChange}
                  />
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

                <div className="wrapp">
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

                <div className="wrapp">
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

                <div className="wrapp">
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
            </div>

            {isInputActive && (
              <button onClick={handleDetailsSubmit}>Отправить детали</button>
            )}
          </>
        )}

        {account && activeTab === "accountContent" && (
          <div>
            {!isModalOpen && (
              <>
                <label
                  htmlFor=""
                  className="label-input"
                  style={{ fontSize: "16px" }}
                >
                  Добавление костюма по параметрам
                </label>
                <br />
                <br />
                <input
                  type="text"
                  className="auth__input"
                  value={searchData}
                  placeholder="Search..."
                  style={{ width: "1400px" }}
                  onClick={handleInputClick}
                />
              </>
            )}

            {isModalOpen && (
              <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal">
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      className="auth__input"
                      value={searchData}
                      onChange={searchValueChange}
                      placeholder="Поиск..."
                      onClick={(e) => e.stopPropagation()}
                      id="search"
                    />
                  </div>
                  <div className="results">
                    {hasResults
                      ? filteredCostumes.map((item) => (
                          <div
                            key={item.id}
                            className="cost"
                            onClick={() => handleItemClick(item)}
                          >
                            <img
                              src={item.costume}
                              alt={`Costume ${item.id}`}
                            />
                            <span>Персонаж: {item.author}</span>
                            <span>Категория: {item.category}</span>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            )}

            <div className="all-costumes">
              <div className="costumes">
                <h2>Костюмы SS</h2>
                <div className="res">
                  <img
                    src={addCostumeImg}
                    alt=""
                    className="addIcon"
                    onClick={() => setIsBigModalOpen(true)}
                  />
                  {userCostumes
                    ?.filter((cost) => cost.category === "SS")
                    ?.map((costume) => (
                      <div key={costume.id} className="one-costume">
                        <img src={costume.costume} alt="Costume" />
                        <span>Персонаж: {costume.author}</span>
                        <img
                          src={del}
                          className="delete"
                          alt="Delete"
                          style={{ height: "30px" }}
                          onClick={() => handleDeleteAccount(costume.id)}
                        />
                      </div>
                    ))
                    .reverse()}
                </div>
              </div>

              <div className="costumes">
                <h2>Костюмы S</h2>
                <div className="res">
                  <img
                    src={addCostumeImg}
                    alt=""
                    className="addIcon"
                    onClick={() => setIsBigModalOpen(true)}
                  />
                  {userCostumes
                    ?.filter((cost) => cost.category === "S")
                    ?.map((costume) => (
                      <div key={costume.id} className="one-costume">
                        <img src={costume.costume} alt="Costume" />
                        <span>Персонаж: {costume.author}</span>
                        <img
                          src={del}
                          className="delete"
                          alt="Delete"
                          style={{ height: "30px" }}
                          onClick={() => handleDeleteAccount(costume.id)}
                        />
                      </div>
                    ))
                    .reverse()}
                </div>
              </div>

              <div className="costumes">
                <h2>Костюмы A</h2>
                <div className="res">
                  <img
                    src={addCostumeImg}
                    alt=""
                    className="addIcon"
                    onClick={() => setIsBigModalOpen(true)}
                  />
                  {userCostumes
                    ?.filter((cost) => cost.category === "A")
                    ?.map((costume) => (
                      <div key={costume.id} className="one-costume">
                        <img src={costume.costume} alt="Costume" />
                        <span>Персонаж: {costume.author}</span>
                        <img
                          src={del}
                          className="delete"
                          alt="Delete"
                          style={{ height: "30px" }}
                          onClick={() => handleDeleteAccount(costume.id)}
                        />
                      </div>
                    ))
                    .reverse()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isBigModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal">
            <h2>Выберите костюм:</h2>
            <div className="results">
              {allCostumes
                ? allCostumes.map((item) => (
                    <div
                      key={item.id}
                      className="cost"
                      onClick={() => handleItemClick(item)}
                    >
                      <img src={item.costume} alt={`Costume ${item.id}`} />
                      <span>Персонаж: {item.author}</span>
                      <p>Категория: {item.category}</p>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
