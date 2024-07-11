import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { Link, useParams } from "react-router-dom";
import userIcon from "../img/user-image.jpg";
import editIcon from "../img/edit-icon2.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  accountDetails,
  addUserAss,
  addUserCostume,
  deleteAss,
  deleteOneCostume,
  getAssessoirs,
  getCostume,
  getOneAccount,
  getUserAss,
  getUserCostumes,
  updateAccount,
} from "../store/actions/account.action";
import iconCircle from "../img/small-circle-icon.png";
import iconPazzle from "../img/small-pazzle-icon.png";
import iconBrilliant from "../img/small-brilliant-icon.png";
import {
  AccountChange,
  AssessoirsType,
  CostumesType,
  DetailsType,
} from "../types";
import del from "../img/delete-icon.png";
import addCostumeImg from "../img/add-icon.png";
import Loader from "../components/Loader";

const EditPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneAccount(accountId!));
    dispatch(getCostume());
    dispatch(getAssessoirs());
    dispatch(getUserCostumes(accountId!));
    dispatch(getUserAss(accountId!));
  }, [dispatch]);

  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const accountId = localStorage.getItem("currentAccount");
  const [activeTab, setActiveTab] = useState("accountData");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AccountChange>({
    game: "",
    gameId: "",
    gameNickname: "",
    gameAccount: "",
  });
  const [gameAccount, setGameAccount] = useState("");
  const {
    account,
    details,
    allCostumes,
    allAssessoirs,
    userCostumes,
    userAss,
  } = useAppSelector((state) => state.accounts);
  const [dmmState, setDmmState] = useState(null);
  const [transferState, setTransferState] = useState(null);
  const [emailState, setEmailState] = useState(null);
  const [costumes, setCostumes] = useState<CostumesType>({
    author: accountId!,
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
  const [searchData, setSearchData] = useState("");
  const [searchAss, setSearchAss] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBigModalOpen, setIsBigModalOpen] = useState(false);
  const [inputStyle, setInputStyle] = useState({});
  const [clickedItem, setClickedItem] = useState<CostumesType>();
  const [clickedAss, setClickedAss] = useState<AssessoirsType>();
  const [selectedItem, setSelectedItem] = useState<CostumesType>({
    author: "",
    costume: "",
    category: "",
    bigAuthor: "",
    id: "",
  });
  const [isAssModalOpen, setIsAssModalOpen] = useState(false);
  const [value, setValue] = useState("");

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

  const handleNewDataChange = (e: any) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setNewData({ ...newData, [name]: value });
      setValue(value);
    }
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

  const handleDeleteAccount = (accountId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот костюм?")) {
      dispatch(deleteOneCostume(accountId))
        .unwrap()
        .catch((error) => {
          console.error("Ошибка при удалении аккаунта:", error);
        });
    }
  };

  const handleDeleteAss = (accountId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот костюм?")) {
      dispatch(deleteAss(accountId))
        .unwrap()
        .catch((error) => {
          console.error("Ошибка при удалении аккаунта:", error);
        });
    }
  };

  const searchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  const filteredCostumes = allCostumes
    ? allCostumes.filter((costume) =>
        costume.author.toLowerCase().includes(searchData.toLowerCase())
      )
    : [];

  const searchAssValue = (e: any) => {
    setSearchAss(e.target.value);
  };

  const filteresAssessoirs = allAssessoirs
    ? allAssessoirs.filter((ass) =>
        ass.character.toLowerCase().includes(searchAss.toLowerCase())
      )
    : [];

  const hasAss = filteresAssessoirs.length > 0 && searchAss.trim() !== "";
  const hasResults = filteredCostumes.length > 0 && searchData.trim() !== "";

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsBigModalOpen(false);
    setIsAssModalOpen(false);
  };

  const handleInputClick = () => {
    setIsModalOpen(true);
    setInputStyle({
      display: "none",
    });
  };

  const handleItemClick = (item: CostumesType) => {
    const selectedItem = {
      costume: item.costume,
      author: item.author,
      bigAuthor: item.bigAuthor,
      category: item.category,
      id: item.id,
    };
    dispatch(addUserCostume({ data: selectedItem, id: accountId! }));
    setClickedItem(selectedItem);
    console.log(selectedItem);
  };

  const handleAssClick = (item: AssessoirsType) => {
    const selectedAss = {
      assessoir: item.assessoir,
      character: item.character,
      bigAuthor: item.bigAuthor,
      id: item.id,
    };
    dispatch(addUserAss({ data: selectedAss, id: accountId! }));
    setClickedAss(selectedAss);
    console.log(selectedAss);
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
            onClick={() =>
              setActiveTab("accountContent" && "accountAssessoirs")
            }
            style={{
              fontWeight: activeTab === "accountContent" ? "700" : "400",
              color: activeTab === "accountData" ? "black" : "#3c00ff",
              cursor: "pointer",
            }}
          >
            <h3>Содержание аккаунта</h3>
            {(activeTab === "accountContent" ||
              activeTab === "accountAssessoirs") && <hr />}
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
                      onClick={() =>
                        toggleState(transferState, setTransferState)
                      }
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

        <div className="main-header">
          <div
            onClick={() => setActiveTab("accountContent")}
            style={{
              fontWeight: activeTab === "accountContent" ? "700" : "400",
              color: activeTab === "accountContent" ? "#3c00ff" : "black",
              cursor: "pointer",
            }}
          >
            <h3>Костюмы</h3>
            {activeTab === "accountContent" && <hr />}
          </div>
          <div
            onClick={() => setActiveTab("accountAssessoirs")}
            style={{
              fontWeight: activeTab === "accountAssessoirs" ? "700" : "400",
              color: activeTab === "accountAssessoirs" ? "#3c00ff" : "black",
              cursor: "pointer",
            }}
          >
            <h3>Аксессуары</h3>
            {activeTab === "accountAssessoirs" && <hr />}
          </div>
        </div>

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
                  placeholder="Поиск..."
                  style={{ width: "1350px" }}
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
                    onClick={() => {
                      setIsBigModalOpen(true);
                      setSelectedItem({ ...selectedItem, category: "SS" });
                    }}
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
                    onClick={() => {
                      setIsBigModalOpen(true);
                      setSelectedItem({ ...selectedItem, category: "S" });
                    }}
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
                    onClick={() => {
                      setIsBigModalOpen(true);
                      setSelectedItem({ ...selectedItem, category: "A" });
                    }}
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
            <div className="resultss">
              <h2>{`Выберите костюм из категории ${selectedItem.category}:`}</h2>
              <div className="res">
                {allCostumes!
                  .filter(
                    (costume) => costume.category === selectedItem?.category
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="cost"
                      onClick={() => handleItemClick(item)}
                    >
                      <img src={item.costume} alt={`Costume ${item.id}`} />
                      <span>Персонаж: {item.author}</span>
                      <p>Категория: {item.category}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {account && activeTab == "accountAssessoirs" && (
        <div className="container">
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
                className="auth__input"
                placeholder="Поиск..."
                style={{ width: "1350px" }}
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
                          <img src={ass.assessoir} alt={`Costume ${ass.id}`} />
                          <span>Персонаж: {ass.character}</span>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          )}

          <div className="all-costumes">
            <div className="costumes">
              <h2>Ваши аксессуары:</h2>
              <div className="res">
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
              </div>
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
                    <img src={item.assessoir} alt={`Аксессуар ${item.id}`} />
                    <span>Персонаж: {item.character}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
