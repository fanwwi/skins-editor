import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { CostumesType } from "../types";
import {
  addUserCostume,
  deleteOneCostume,
} from "../store/actions/account.action";
import addCostumeImg from "../img/add-icon.png";
import del from "../img/delete-icon.png";
import bottom from "../img/bottom.png";
import top from "../img/top.png";

const AccountContent = () => {
  const { account } = useAppSelector((state) => state.accounts);
  const { allCostumes } = useAppSelector((state) => state.accounts);
  const { userCostumes } = useAppSelector((state) => state.accounts);
  const [activeTab, setActiveTab] = useState("accountData");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputStyle, setInputStyle] = useState({});
  const [searchData, setSearchData] = useState("");
  const [clickedItem, setClickedItem] = useState<CostumesType>();
  const accountId = localStorage.getItem("currentAccount");
  const [showCostumesS, setShowCostumesS] = useState(false);
  const [showCostumesSS, setShowCostumesSS] = useState(false);
  const [showCostumesA, setShowCostumesA] = useState(false);
  const [showAss, setShowAss] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CostumesType>({
    author: "",
    costume: "",
    category: "",
    bigAuthor: "",
    id: "",
  });

  const [isBigModalOpen, setIsBigModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleInputClick = () => {
    setIsModalOpen(true);
    setInputStyle({
      display: "none",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const searchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  const [s, setS] = useState(false);
  const [ss, setSS] = useState(false);
  const [a, setA] = useState(false);

  const filteredCostumes = allCostumes
    ? allCostumes.filter((costume) =>
        costume.author.toLowerCase().includes(searchData.toLowerCase())
      )
    : [];

  const hasResults = filteredCostumes.length > 0 && searchData.trim() !== "";

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

  const costumesSStyle = {
    height: showCostumesS ? "auto" : "100px",
    overflow: "hidden",
    transition: "height 0.3s ease",
  };

  const costumesSSStyle = {
    height: showCostumesSS ? "auto" : "100px",
    overflow: "hidden",
    transition: "height 0.3s ease",
  };

  const costumesAStyle = {
    height: showCostumesA ? "auto" : "100px",
    overflow: "hidden",
    transition: "height 0.3s ease",
  };

  const handleToggleCostumesS = () => {
    setShowCostumesS(!showCostumesS);
  };

  const handleToggleCostumesSS = () => {
    setShowCostumesSS(!showCostumesSS);
  };

  const handleToggleCostumesA = () => {
    setShowCostumesA(!showCostumesA);
  };

  const handleDeleteCostume = (id: string) => {
    dispatch(deleteOneCostume(id));
  };

  return (
    <div>
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
              className="auth__input long"
              placeholder="Поиск..."
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
                  style={{
                    width: "1500px",
                    height: "50px",
                  }}
                />

                <select
                  onChange={(e) => {
                    const category = e.target.value;
                    if (category === "S") {
                      setS(true);
                      setSS(false);
                      setA(false);
                    } else if (category === "SS") {
                      setS(false);
                      setSS(true);
                      setA(false);
                    } else if (category === "A") {
                      setS(false);
                      setSS(false);
                      setA(true);
                    } else {
                      setS(false);
                      setSS(false);
                      setA(false);
                    }
                  }}
                  className="auth__input"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                >
                  <option value="">Все категории</option>
                  <option value="S">Костюмы S</option>
                  <option value="SS">Костюмы SS</option>
                  <option value="A">Костюмы A</option>
                </select>
              </div>
              <div className="results">
                {hasResults &&
                  (s
                    ? filteredCostumes
                        .filter((item) => item.category === "S")
                        .map((item) => (
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
                    : ss
                    ? filteredCostumes
                        .filter((item) => item.category === "SS")
                        .map((item) => (
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
                    : a
                    ? filteredCostumes
                        .filter((item) => item.category === "A")
                        .map((item) => (
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
                    : filteredCostumes.map((item) => (
                        <div
                          key={item.id}
                          className="cost"
                          onClick={() => handleItemClick(item)}
                        >
                          <img src={item.costume} alt={`Costume ${item.id}`} />
                          <span>Персонаж: {item.author}</span>
                          <span>Категория: {item.category}</span>
                        </div>
                      )))}
              </div>
            </div>
          </div>
        )}

        <div className="all-costumes">
          <div className="costumes" style={costumesSStyle}>
            <div className="top" onClick={handleToggleCostumesS}>
              <h2>Костюмы S</h2>
              <img src={showCostumesS ? bottom : top} alt="" />
            </div>
            <div className="res" style={costumesSStyle}>
              {showCostumesS && (
                <>
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
                        <span>Категория: {costume.category}</span>
                        <img
                          src={del}
                          className="delete"
                          alt="Delete"
                          style={{ height: "30px" }}
                          onClick={() => handleDeleteCostume(costume.id)}
                        />
                      </div>
                    ))
                    .reverse()}
                </>
              )}
            </div>
          </div>

          <div className="costumes" style={costumesSSStyle}>
            <div className="top" onClick={handleToggleCostumesSS}>
              <h2>Костюмы SS</h2>
              <img src={showCostumesSS ? bottom : top} alt="" />
            </div>
            <div className="res">
              {showCostumesSS && (
                <>
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
                        <span>Категория: {costume.category}</span>
                        <img
                          src={del}
                          className="delete"
                          alt="Delete"
                          style={{ height: "30px" }}
                          onClick={() => dispatch(deleteOneCostume(costume.id))}
                        />
                      </div>
                    ))
                    .reverse()}
                </>
              )}
            </div>
          </div>

          <div className="costumes" style={costumesAStyle}>
            <div className="top" onClick={handleToggleCostumesA}>
              <h2>Костюмы A</h2>
              <img src={showCostumesA ? bottom : top} alt="" />
            </div>
            <div className="res">
              {showCostumesA && (
                <>
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
                        <span>Категория: {costume.category}</span>
                        <img
                          src={del}
                          className="delete"
                          alt="Delete"
                          style={{ height: "30px" }}
                          onClick={() => dispatch(deleteOneCostume(costume.id))}
                        />
                      </div>
                    ))
                    .reverse()}
                </>
              )}
            </div>

            {isBigModalOpen && (
              <div
                className="modal-overlay"
                onClick={() => {
                  setIsBigModalOpen(false);
                }}
              >
                <div className="modal">
                  <div className="resultss">
                    <h2>{`Выберите костюм из категории ${selectedItem.category}:`}</h2>
                    <div className="res">
                      {allCostumes!
                        .filter(
                          (costume) =>
                            costume.category === selectedItem?.category
                        )
                        .map((item) => (
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
                            <p>Категория: {item.category}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
