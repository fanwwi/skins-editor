import React, { useEffect, useRef, useState } from "react";
import rainbow from "../img/rainbow-ball.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getOneAccount,
  getUserAss,
  getUserCostumes,
} from "../store/actions/account.action";
import { toJpeg } from "html-to-image";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../img/delete-icon.png";
import alignLeft from "../img/alignLeft.png";
import alignRight from "../img/alignRight.png";
import alignCenter from "../img/alignCenter.png";
import close from "../img/close.png";
import reset from "../img/reset.png";
import ProfileHeader from "../components/ProfileHeader";

interface TextElement {
  id: number;
  text: string;
  isEditing: boolean;
  x: number;
  y: number;
  fontSize: number;
}

const EditorPage: React.FC = () => {
  const accountId = localStorage.getItem("currentAccount");
  const { userCostumes } = useAppSelector((state) => state.accounts);
  const { userAss } = useAppSelector((state) => state.accounts);
  const { account } = useAppSelector((state) => state.accounts);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneAccount(accountId!));
    dispatch(getUserCostumes(accountId!));
    dispatch(getUserAss(accountId!));
  }, [dispatch]);

  //! States
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [draggedTextId, setDraggedTextId] = useState<number | null>(null);
  const [images, setImages] = useState<
    { id: string; src: string; position: { x: number; y: number } }[]
  >([]);
  const [draggedImageId, setDraggedImageId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [editingTextElementId, setEditingTextElementId] = useState<
    number | null
  >(null);
  const [editingText, setEditingText] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [canvasSize, setCanvasSize] = useState(700);

  //! State Objects

  const [isShownState, setIsShownState] = useState({
    costumeS: false,
    costumeSS: false,
    costumeA: false,
    ass: false,
    nickname: false,
    gameAccount: false,
    id: false,
    server: false,
  });

  const [positions, setPositions] = useState({
    costumeS: { x: 0, y: 0 },
    costumeSS: { x: 0, y: 0 },
    costumeA: { x: 0, y: 0 },
    ass: { x: 0, y: 0 },
    nickname: { x: 0, y: 0 },
    gameAccount: { x: 0, y: 0 },
    id: { x: 0, y: 0 },
    server: { x: 0, y: 0 },
    modal: { x: 0, y: 0 },
    imageModal: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    startImageOffset: { x: 0, y: 0 },
    startDragOffset: { x: 0, y: 0 },
  });

  const [draggingStates, setDraggingStates] = useState({
    image: false,
    general: false,
    costumeS: false,
    costumeSS: false,
    costumeA: false,
    ass: false,
    nickname: false,
    account: false,
    id: false,
    server: false,
  });

  const [contextModals, setContextModals] = useState({
    costumeS: false,
    costumeSS: false,
    costumeA: false,
    ass: false,
    image: false,
    nickname: false,
    server: false,
    gameAccount: false,
    id: false,
  });

  const [sizes, setSizes] = useState({
    nickname: 16,
    server: 16,
    gameAccount: 16,
    id: 16,
    image: 155,
    text: 16,
    costumeS: 155,
    costumeSS: 155,
    costumeA: 155,
    ass: 155,
  });

  const [colors, setColors] = useState({
    server: "#000000",
    id: "#000000",
    account: "#000000",
    nickname: "#000000",
  });

  const [alignments, setAlignments] = useState({
    nickname: "left",
    id: "left",
    gameAccount: "left",
    server: "left",
    sAlign: "left",
    ssAlign: "left",
    aAlign: "left",
    assAlign: "left",
  });

  const [fonts, setFonts] = useState({
    nickname: "Arial",
    id: "Arial",
    gameAccount: "Arial",
    server: "Arial",
  });

  //! Handlers

  const openCostumes = (modalName: any) => {
    setIsShownState((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  const closeCostumes = (modalName: any) => {
    setIsShownState((prevState: any) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  const handlePositionChange = (key: any, x: any, y: any) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [key]: { x, y },
    }));
  };

  const handleDraggingChange = (key: any, isDragging: any) => {
    setDraggingStates((prevStates) => ({
      ...prevStates,
      [key]: isDragging,
    }));
  };

  const openContextModal = (modalName: any) => {
    setContextModals((prevState: any) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  const closeContextModal = (modalName: any) => {
    setContextModals((prevState: any) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  const increaseCanvasSize = () => {
    setCanvasSize((prevSize) => Math.min(prevSize + 50, 1000));
  };

  const decreaseCanvasSize = () => {
    setCanvasSize((prevSize) => Math.max(prevSize - 50, 500));
  };

  const updateSize = (key: any, newSize: any) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [key]: newSize,
    }));
  };

  const handleChangeBgColor = (color: string) => {
    setBackgroundColor(color);
    setShowModal(false);
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundImage(e.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
  };

  const handleColorChange = (key: any) => (event: any) => {
    setColors((prevColors) => ({
      ...prevColors,
      [key]: event.target.value,
    }));
  };

  const updateAlignment = (key: any, alignment: any) => {
    setAlignments((prevAlignments) => ({
      ...prevAlignments,
      [key]: alignment,
    }));
  };

  const updateFont = (key: any, font: any) => {
    setFonts((prevFonts) => ({
      ...prevFonts,
      [key]: font,
    }));
  };

  //! Mouses and Clicks

  const addTextElement = () => {
    const newTextElement: TextElement = {
      id: textElements.length,
      text: "Новый текст",
      isEditing: false,
      x: 50,
      y: 50,
      fontSize: sizes.text,
    };
    setTextElements([...textElements, newTextElement]);
  };

  const handleMouseDown = (
    id: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    handleDraggingChange("general", true);
    handlePositionChange("mouse", event.clientX, event.clientY);
    switch (id) {
      case 1:
        handleDraggingChange("costumeS", true);
        break;
      case 2:
        handleDraggingChange("costumeSS", true);
        break;
      case 3:
        handleDraggingChange("costumeA", true);
        break;
      case 4:
        handleDraggingChange("ass", true);
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const dx = event.clientX - positions.mouse.x;
    const dy = event.clientY - positions.mouse.y;
    handlePositionChange("mouse", event.clientX, event.clientY);
    if (draggingStates.costumeS) {
      handlePositionChange(
        "costumeS",
        positions.costumeS.x + dx,
        positions.costumeS.y + dy
      );
    }
    if (draggingStates.costumeSS) {
      handlePositionChange(
        "costumeSS",
        positions.costumeSS.x + dx,
        positions.costumeSS.y + dy
      );
    }
    if (draggingStates.costumeA) {
      handlePositionChange(
        "costumeA",
        positions.costumeA.x + dx,
        positions.costumeA.y + dy
      );
    }
    if (draggingStates.ass) {
      handlePositionChange("ass", positions.ass.x + dx, positions.ass.y + dy);
    }
  };

  const handleMouseUp = () => {
    handleDraggingChange("general", false);
    handleDraggingChange("costumeS", false);
    handleDraggingChange("costumeSS", false);
    handleDraggingChange("costumeA", false);
    handleDraggingChange("ass", false);
  };

  const handleMouseDownText = (
    id: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    const element = textElements.find((element) => element.id === id);
    if (element) {
      setIsDraggingText(true);
      setDraggedTextId(id);
      handlePositionChange(
        "startDragOffset",
        event.clientX - element.x,
        event.clientY - element.y
      );
    }
  };

  const handleDoubleClick = (id: number) => {
    const element = textElements.find((element) => element.id === id);
    if (element) {
      setEditingTextElementId(id);
      setEditingText(element.text);
    }
  };

  const handleMouseMoveText = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingText && draggedTextId !== null) {
      const updatedTextElements = textElements.map((element) => {
        if (element.id === draggedTextId) {
          const newX = event.clientX - positions.startDragOffset.x;
          const newY = event.clientY - positions.startDragOffset.y;
          return { ...element, x: newX, y: newY };
        }
        return element;
      });
      setTextElements(updatedTextElements);
    }
  };

  const handleMouseUpText = () => {
    setIsDraggingText(false);
    setDraggedTextId(null);
  };

  const saveTextElement = () => {
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === editingTextElementId
          ? { ...element, text: editingText }
          : element
      )
    );
    setEditingTextElementId(null);
    setEditingText("");
  };

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    if (canvasRef.current) {
      try {
        const dataUrl = await toJpeg(canvasRef.current, {
          quality: 0.95,
        });
        const response = await axios.post("http://localhost:8001/userCards", {
          card: dataUrl,
          author: accountId,
        });
        navigate(`/payment/${accountId}`);
        return response.data;
      } catch (error) {
        console.error("Error saving image:", error);
      }
    }
  };

  const handleAccountMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const dx = event.clientX - positions.mouse.x;
    const dy = event.clientY - positions.mouse.y;
    handlePositionChange("mouse", event.clientX, event.clientY);
    if (draggingStates.account) {
      handlePositionChange(
        "gameAccount",
        positions.gameAccount.x + dx,
        positions.gameAccount.y + dy
      );
    }
    if (draggingStates.nickname) {
      handlePositionChange(
        "nickname",
        positions.nickname.x + dx,
        positions.nickname.y + dy
      );
    }
    if (draggingStates.id) {
      handlePositionChange("id", positions.id.x + dx, positions.id.y + dy);
    }
    if (draggingStates.server) {
      handlePositionChange(
        "server",
        positions.server.x + dx,
        positions.server.y + dy
      );
    }
  };

  const handleMouseUpAccount = () => {
    handleDraggingChange("account", false);
    handleDraggingChange("nickname", false);
    handleDraggingChange("id", false);
    handleDraggingChange("server", false);
  };

  const handleAccountMouseDown = (
    elementId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    switch (elementId) {
      case "gameAccount":
        handleDraggingChange("account", true);
        break;
      case "nickname":
        handleDraggingChange("nickname", true);
        break;
      case "id":
        handleDraggingChange("id", true);
        break;
      case "server":
        handleDraggingChange("server", true);
        break;
      default:
        break;
    }
  };

  const addImage = () => {
    const imgUrl = document.getElementById("img") as HTMLInputElement;
    const newImage = {
      id: `image-${images.length}`,
      src: imgUrl.value,
      position: { x: 0, y: 0 },
    };
    setImages((prevImages) => [...prevImages, newImage]);
    imgUrl.value = "";
  };

  const handleImageMouseDown = (
    id: string,
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    event.stopPropagation();
    const image = images.find((img) => img.id === id);
    if (image) {
      handleDraggingChange("image", true);
      setDraggedImageId(id);
      handlePositionChange(
        "startImageOffset",
        event.clientX - image.position.x,
        event.clientY - image.position.y
      );
    }
  };

  const handleImageMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    handlePositionChange("mouse", event.clientX, event.clientY);
    if (draggingStates.image && draggedImageId !== null) {
      const updatedImages = images.map((img) => {
        if (img.id === draggedImageId) {
          return {
            ...img,
            position: {
              x: event.clientX - positions.startImageOffset.x,
              y: event.clientY - positions.startImageOffset.y,
            },
          };
        }
        return img;
      });
      setImages(updatedImages);
    }
  };

  const handleImageMouseUp = () => {
    handleDraggingChange("image", false);
    setDraggedImageId(null);
  };

  const handleImageClick = (position: any) => {
    handlePositionChange("imageModal", position.x, position.y - 100);
    openContextModal("image");
  };

  //! return

  return (
    <div className="list">
      <ProfileHeader />
      <hr />
      <div className="options">
        <div className="container">
          <div className="block-top">
            <h3
              id="color"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <img src={rainbow} alt="" /> Заливка{" "}
              <input
                type="color"
                onChange={(e) => handleChangeBgColor(e.target.value)}
              />
            </h3>
            <div className="label">
              Изображение для заливки
              <input
                type="text"
                value={backgroundImage || ""}
                onChange={handleBackgroundImageChange}
              />
            </div>

            <div className="canva-size">
              <span>Размер холста:</span>
              <div className="down-block">
                <button onClick={increaseCanvasSize}>+</button>
                <div className="fz">{canvasSize}</div>
                <button onClick={decreaseCanvasSize}>-</button>
              </div>
            </div>
          </div>
          <div className="btns" style={{ display: "flex" }}>
            <div
              className="auth-btn2"
              onClick={() => navigate(`/edit/${accountId}/`)}
            >
              Назад
            </div>
            <div className="save-btn" onClick={() => setModal(true)}>
              Сохранить
            </div>
          </div>
        </div>
      </div>
      <div className="center">
        <div className="tab">
          <div className="tab-buttons">
            <button
              className={`tab-button ${
                activeTab === "content" ? "active" : ""
              }`}
              onClick={() => setActiveTab("content")}
            >
              Содержание аккаунта
            </button>
            <button
              className={`tab-button ${
                activeTab === "account-data" ? "active" : ""
              }`}
              onClick={() => setActiveTab("account-data")}
            >
              Данные аккаунта
            </button>
            <button
              className={`tab-button ${
                activeTab === "elements" ? "active" : ""
              }`}
              onClick={() => setActiveTab("elements")}
            >
              Элементы
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "content" && (
              <div className="costumes-block">
                <button onClick={() => openCostumes("costumeS")}>
                  Костюмы S
                </button>
                <button onClick={() => openCostumes("costumeSS")}>
                  Костюмы SS
                </button>
                <button onClick={() => openCostumes("costumeA")}>
                  Костюмы A
                </button>
                <button onClick={() => openCostumes("ass")}>Аксессуары</button>
              </div>
            )}
            {activeTab === "account-data" && (
              <div className="costumes-block">
                <button onClick={() => openCostumes("nickname")}>
                  Никнэйм
                  <span>{account?.gameNickname}</span>
                </button>
                <button onClick={() => openCostumes("gameAccount")}>
                  Имя акканута
                  <span>{account?.gameAccount}</span>
                </button>
                <button onClick={() => openCostumes("server")}>
                  Сервер
                  <span>{account?.gameServer}</span>
                </button>
                <button onClick={() => openCostumes("id")}>
                  ID
                  <span>{account?.gameId}</span>
                </button>
              </div>
            )}
            {activeTab === "elements" && (
              <div className="costumes-block">
                <input
                  id="img"
                  placeholder="Вставьте ссылку на вашу картинку"
                  onChange={addImage}
                />
                <button onClick={addTextElement}>Добавить текст</button>
              </div>
            )}
          </div>
        </div>
        <div
          className="canva"
          ref={canvasRef}
          style={{
            width: canvasSize,
            backgroundColor: backgroundColor,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : undefined,
            backgroundSize: "cover",
            position: "absolute",
            right: `calc(70% - ${canvasSize}px)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="costumes-container" style={{ position: "relative" }}>
            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: positions.costumeS.x,
                top: positions.costumeS.y,
                cursor: draggingStates.costumeS ? "grabbing" : "default",
                justifyItems: alignments.sAlign,
                width: "200px",
              }}
              onMouseDown={(e) => handleMouseDown(1, e)}
            >
              {draggingStates.costumeS && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-30px",
                    padding: "5px",
                    color: "#5010be",
                  }}
                >
                  Костюмы S
                </div>
              )}
              {isShownState.costumeS &&
                userCostumes
                  ?.filter((cost) => cost.category === "S")
                  ?.map((costume) => (
                    <div
                      key={costume.id}
                      className="display-cost"
                      style={{
                        position: "relative",
                        left: costume.x || 0,
                        top: costume.y || 0,
                        height: sizes.costumeS,
                        justifyItems: alignments.sAlign,
                      }}
                    >
                      {contextModals.costumeS && (
                        <div className="context-modal">
                          <div className="fz">
                            <div className="btns">
                              <button
                                onClick={() =>
                                  updateSize("costumeS", sizes.costumeS++)
                                }
                              >
                                +
                              </button>
                              <span>{sizes.costumeS}</span>
                              <button
                                onClick={() =>
                                  updateSize("costumeS", sizes.costumeS--)
                                }
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <div
                            className="del"
                            onClick={() => {
                              updateSize("costumeS", "155");
                            }}
                          >
                            <h6>Сброс</h6>
                            <img src={reset} alt="" />
                          </div>

                          <div
                            className="del"
                            onClick={() => closeCostumes("costumeS")}
                          >
                            <h6>Удалить</h6>
                            <img src={deleteIcon} alt="" />
                          </div>

                          <select name="" id="">
                            <option value="">Добавить в группу</option>
                            <option
                              value=""
                              onClick={() => {
                                openCostumes("groupedSSandS");
                                closeCostumes("costumeS");
                              }}
                            >
                              Костюмы SS
                            </option>
                            <option value="">Костюмы A</option>
                          </select>

                          <div className="btns">
                            <img
                              src={alignLeft}
                              alt=""
                              onClick={() => updateAlignment("sAlign", "left")}
                            />
                            <img
                              src={alignCenter}
                              alt=""
                              onClick={() =>
                                updateAlignment("sAlign", "center")
                              }
                            />
                            <img
                              src={alignRight}
                              alt=""
                              onClick={() => updateAlignment("sAlign", "right")}
                            />
                          </div>

                          <img
                            src={close}
                            alt=""
                            onClick={() => closeContextModal("costumeS")}
                            className="close"
                            style={{ width: "10px", height: "10px" }}
                          />
                        </div>
                      )}

                      <img
                        src={costume.costume}
                        alt="Costume"
                        style={{
                          height: sizes.costumeS,
                        }}
                        onClick={() => openContextModal("costumeS")}
                      />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: positions.costumeSS.x,
                top: positions.costumeSS.y,
                cursor: draggingStates.costumeSS ? "grabbing" : "default",
                justifyItems: alignments.ssAlign,
                width: "300px",
              }}
              onMouseDown={(e) => handleMouseDown(2, e)}
            >
              {draggingStates.costumeSS && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-30px",
                    padding: "5px",
                    color: "#5010be",
                  }}
                >
                  Костюмы SS
                </div>
              )}
              {isShownState.costumeSS &&
                userCostumes
                  ?.filter((cost) => cost.category === "SS")
                  ?.map((costume) => (
                    <div
                      key={costume.id}
                      className="display-cost"
                      style={{
                        left: costume.x || 0,
                        top: costume.y || 0,
                        height: sizes.costumeSS,
                      }}
                    >
                      {contextModals.costumeSS && (
                        <div className="context-modal">
                          <div className="fz">
                            <div className="btns">
                              <button
                                onClick={() =>
                                  updateSize("costumeSS", sizes.costumeSS++)
                                }
                              >
                                +
                              </button>
                              <span>{sizes.costumeSS}</span>
                              <button
                                onClick={() =>
                                  updateSize("costumeSS", sizes.costumeSS--)
                                }
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <div
                            className="del"
                            onClick={() => {
                              updateSize("costumeSS", "155");
                            }}
                          >
                            <h6>Сброс</h6>
                            <img src={reset} alt="" />
                          </div>

                          <div
                            className="del"
                            onClick={() => closeCostumes("costumeSS")}
                          >
                            <h6>Удалить</h6>
                            <img src={deleteIcon} alt="" />
                          </div>

                          <select name="" id="">
                            <option value="">Добавить в группу</option>
                            <option value="">Костюмы S</option>
                            <option value="">Костюмы A</option>
                          </select>

                          <div className="btns">
                            <img
                              src={alignLeft}
                              alt=""
                              onClick={() => updateAlignment("ssAlign", "left")}
                            />
                            <img
                              src={alignCenter}
                              alt=""
                              onClick={() =>
                                updateAlignment("ssAlign", "center")
                              }
                            />
                            <img
                              src={alignRight}
                              alt=""
                              onClick={() =>
                                updateAlignment("ssAlign", "right")
                              }
                            />
                          </div>

                          <img
                            src={close}
                            alt=""
                            onClick={() => closeContextModal("costumeSS")}
                            className="close"
                            style={{ width: "10px", height: "10px" }}
                          />
                        </div>
                      )}
                      <img
                        src={costume.costume}
                        alt="Costume"
                        onClick={() => {
                          openContextModal("costumeSS");
                        }}
                        style={{
                          height: sizes.costumeSS,
                        }}
                      />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: positions.costumeA.x,
                top: positions.costumeA.y,
                cursor: draggingStates.costumeA ? "grabbing" : "default",
                justifyItems: alignments.aAlign,
              }}
              onMouseDown={(e) => handleMouseDown(3, e)}
            >
              {draggingStates.costumeA && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-30px",
                    padding: "5px",
                    color: "#5010be",
                  }}
                >
                  Костюмы A
                </div>
              )}
              {isShownState.costumeA &&
                userCostumes
                  ?.filter((cost) => cost.category === "A")
                  ?.map((costume) => (
                    <div
                      key={costume.id}
                      className="display-cost"
                      style={{
                        left: costume.x || 0,
                        top: costume.y || 0,
                        height: sizes.costumeA,
                      }}
                    >
                      {contextModals.costumeA && (
                        <div className="context-modal">
                          <div className="fz">
                            <div className="btns">
                              <button
                                onClick={() =>
                                  updateSize("costumeA", sizes.costumeA++)
                                }
                              >
                                +
                              </button>
                              <span>{sizes.costumeA}</span>
                              <button
                                onClick={() =>
                                  updateSize("costumeA", sizes.costumeA--)
                                }
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <div
                            className="del"
                            onClick={() => {
                              updateSize("costumeA", "155");
                            }}
                          >
                            <h6>Сброс</h6>
                            <img src={reset} alt="" />
                          </div>

                          <div
                            className="del"
                            onClick={() => closeCostumes("costumeA")}
                          >
                            <h6>Удалить</h6>
                            <img src={deleteIcon} alt="" />
                          </div>

                          <select name="" id="">
                            <option value="">Добавить в группу</option>
                            <option value="">Костюмы SS</option>
                            <option value="">Костюмы S</option>
                          </select>

                          <div className="btns">
                            <img
                              src={alignLeft}
                              alt=""
                              onClick={() => updateAlignment("aAlign", "left")}
                            />
                            <img
                              src={alignCenter}
                              alt=""
                              onClick={() =>
                                updateAlignment("aAling", "center")
                              }
                            />
                            <img
                              src={alignRight}
                              alt=""
                              onClick={() => updateAlignment("aAlign", "right")}
                            />
                          </div>

                          <img
                            src={close}
                            alt=""
                            onClick={() => closeContextModal("costumeA")}
                            className="close"
                            style={{ width: "10px", height: "10px" }}
                          />
                        </div>
                      )}
                      <img
                        src={costume.costume}
                        alt="Costume"
                        onClick={() => {
                          openContextModal("costumeA");
                        }}
                        style={{
                          height: sizes.costumeA,
                        }}
                      />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: positions.ass.x,
                top: positions.ass.y,
                cursor: draggingStates.ass ? "grabbing" : "default",
                justifyItems: alignments.assAlign,
              }}
              onMouseDown={(e) => handleMouseDown(4, e)}
            >
              {draggingStates.ass && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-30px",
                    padding: "5px",
                    color: "#5010be",
                  }}
                >
                  Аксессуары
                </div>
              )}
              {isShownState.ass &&
                userAss?.map((ass) => (
                  <div
                    key={ass.id}
                    className="display-cost"
                    style={{
                      left: ass.x || 0,
                      top: ass.y || 0,
                      height: sizes.ass,
                    }}
                  >
                    {contextModals.ass && (
                      <div className="context-modal">
                        <div className="fz">
                          <div className="btns">
                            <button
                              onClick={() => updateSize("ass", sizes.ass++)}
                            >
                              +
                            </button>
                            <span>{sizes.ass}</span>
                            <button
                              onClick={() => updateSize("ass", sizes.ass--)}
                            >
                              -
                            </button>
                          </div>
                        </div>

                        <div
                          className="del"
                          onClick={() => {
                            updateSize("ass", "155");
                          }}
                        >
                          <h6>Сброс</h6>
                          <img src={reset} alt="" />
                        </div>

                        <div
                          className="del"
                          onClick={() => closeCostumes("ass")}
                        >
                          <h6>Удалить</h6>
                          <img src={deleteIcon} alt="" />
                        </div>

                        <select name="" id="">
                          <option value="">Добавить в группу</option>
                          <option value="">Костюмы SS</option>
                          <option value="">Костюмы S</option>
                        </select>

                        <div className="btns">
                          <img
                            src={alignLeft}
                            alt=""
                            onClick={() => updateAlignment("assAlign", "left")}
                          />
                          <img
                            src={alignCenter}
                            alt=""
                            onClick={() =>
                              updateAlignment("assAlign", "center")
                            }
                          />
                          <img
                            src={alignRight}
                            alt=""
                            onClick={() => updateAlignment("assAlign", "right")}
                          />
                        </div>

                        <img
                          src={close}
                          alt=""
                          onClick={() => closeContextModal("ass")}
                          className="close"
                          style={{
                            width: "10px",
                            height: "10px",
                          }}
                        />
                      </div>
                    )}

                    <img
                      src={ass.assessoir}
                      alt="Costume"
                      onClick={() => {
                        openContextModal("ass");
                      }}
                      style={{
                        height: sizes.ass,
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="account-all">
            <div
              className="account-details"
              style={{
                position: "absolute",
                left: positions.gameAccount.x,
                top: positions.gameAccount.y,
                fontSize: sizes.gameAccount,
                justifyItems: alignments.gameAccount,
                cursor: draggingStates.account ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("gameAccount", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {draggingStates.account && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-20px",
                    padding: "5px",
                    fontSize: "13px",
                    color: "#5010be",
                  }}
                >
                  Аккаунт
                </div>
              )}
              {contextModals.gameAccount && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button
                        onClick={() =>
                          updateSize("gameAccount", sizes.gameAccount++)
                        }
                      >
                        +
                      </button>
                      <span>{sizes.gameAccount}</span>
                      <button
                        onClick={() =>
                          updateSize("gameAccount", sizes.gameAccount--)
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      closeCostumes("gameAccount");
                      closeContextModal("gameAccount");
                    }}
                  >
                    <h6>Удалить</h6>
                    <img src={deleteIcon} alt="" />
                  </div>
                  <div
                    id="color"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h6>Цвет</h6>
                    <img src={rainbow} alt="" style={{ width: "20px" }} />
                    <input
                      type="color"
                      value={colors.account}
                      onChange={() => handleColorChange("account")}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option
                      value="Arial"
                      onClick={() => updateFont("gameAccount", "Arial")}
                    >
                      Arial
                    </option>
                    <option
                      value="Open Sans"
                      onClick={() => updateFont("gameAccount", "Open Sans")}
                    >
                      Open Sans
                    </option>
                    <option
                      value="Inter"
                      onClick={() => updateFont("gameAccount", "Inter")}
                    >
                      Inter
                    </option>
                  </select>

                  <div className="btns">
                    <img
                      src={alignLeft}
                      alt=""
                      onClick={() => updateAlignment("gameAccount", "left")}
                    />
                    <img
                      src={alignCenter}
                      alt=""
                      onClick={() => updateAlignment("gameAccount", "center")}
                    />
                    <img
                      src={alignRight}
                      alt=""
                      onClick={() => updateAlignment("gameAccount", "right")}
                    />
                  </div>
                  <img
                    src={close}
                    alt=""
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      width: "10px",
                      height: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => closeContextModal("gameAccount")}
                  />
                </div>
              )}

              {isShownState.gameAccount && (
                <h3
                  onClick={() => openContextModal("gameAccount")}
                  style={{
                    fontSize: `${sizes.gameAccount}px`,
                    color: colors.account,
                    fontFamily: fonts.gameAccount,
                  }}
                >
                  {account?.gameAccount}
                </h3>
              )}
            </div>

            <div
              className="account-details"
              style={{
                position: "absolute",
                left: positions.nickname.x,
                top: positions.nickname.y,
                fontSize: sizes.nickname,
                cursor: draggingStates.nickname ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("nickname", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {draggingStates.nickname && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-20px",
                    padding: "5px",
                    fontSize: "13px",
                    color: "#5010be",
                  }}
                >
                  Никнэйм
                </div>
              )}
              {contextModals.nickname && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button
                        onClick={() => updateSize("nickname", sizes.nickname++)}
                      >
                        +
                      </button>
                      <span>{sizes.nickname}</span>
                      <button
                        onClick={() => updateSize("nickname", sizes.nickname--)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      closeCostumes("nickname");
                      closeContextModal("nickname");
                    }}
                  >
                    <h6>Удалить</h6>
                    <img src={deleteIcon} alt="" />
                  </div>
                  <div
                    id="color"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h6>Цвет</h6>
                    <img src={rainbow} alt="" style={{ width: "20px" }} />
                    <input
                      type="color"
                      value={colors.nickname}
                      onChange={() => handleColorChange("nickname")}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option
                      value="Arial"
                      onClick={() => updateFont("nickname", "Arial")}
                    >
                      Arial
                    </option>
                    <option
                      value="Open Sans"
                      onClick={() => updateFont("nickname", "Open Sans")}
                    >
                      Open Sans
                    </option>
                    <option
                      value="Inter"
                      onClick={() => updateFont("nickname", "Inter")}
                    >
                      Inter
                    </option>
                  </select>

                  <div className="btns">
                    <img
                      src={alignLeft}
                      alt=""
                      onClick={() => updateAlignment("nickname", "left")}
                    />
                    <img
                      src={alignCenter}
                      alt=""
                      onClick={() => updateAlignment("nickname", "center")}
                    />
                    <img
                      src={alignRight}
                      alt=""
                      onClick={() => updateAlignment("nickname", "right")}
                    />
                  </div>
                  <img
                    src={close}
                    alt=""
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      width: "10px",
                      height: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => closeContextModal("nickname")}
                  />
                </div>
              )}

              {isShownState.nickname && (
                <span
                  onClick={() => openContextModal("nickname")}
                  style={{
                    fontSize: `${sizes.nickname}px`,
                    color: colors.nickname,
                    justifyItems: alignments.nickname,
                    fontFamily: fonts.nickname,
                  }}
                >
                  Никнэйм: {account?.gameNickname}
                </span>
              )}
            </div>

            <div
              className="account-details"
              style={{
                position: "absolute",
                left: positions.id.x,
                top: positions.id.y,
                fontSize: sizes.id,
                cursor: draggingStates.id ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("id", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {draggingStates.id && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-20px",
                    padding: "5px",
                    fontSize: "13px",
                    color: "#5010be",
                  }}
                >
                  ID акканута
                </div>
              )}
              {contextModals.id && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button onClick={() => updateSize("id", sizes.id++)}>
                        +
                      </button>
                      <span>{sizes.id}</span>
                      <button onClick={() => updateSize("id", sizes.id--)}>
                        -
                      </button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      closeCostumes("id");
                      closeContextModal("id");
                    }}
                  >
                    <h6>Удалить</h6>
                    <img src={deleteIcon} alt="" />
                  </div>
                  <div
                    id="color"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h6>Цвет</h6>
                    <img src={rainbow} alt="" style={{ width: "20px" }} />
                    <input
                      type="color"
                      value={colors.id}
                      onChange={() => handleColorChange("id")}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option
                      value="Arial"
                      onClick={() => updateFont("id", "Arial")}
                    >
                      Arial
                    </option>
                    <option
                      value="Open Sans"
                      onClick={() => updateFont("id", "Opne Sans")}
                    >
                      Open Sans
                    </option>
                    <option
                      value="Inter"
                      onClick={() => updateFont("id", "Inter")}
                    >
                      Inter
                    </option>
                  </select>

                  <div className="btns">
                    <img
                      src={alignLeft}
                      alt=""
                      onClick={() => updateAlignment("id", "left")}
                    />
                    <img
                      src={alignCenter}
                      alt=""
                      onClick={() => updateAlignment("id", "center")}
                    />
                    <img
                      src={alignRight}
                      alt=""
                      onClick={() => updateAlignment("id", "right")}
                    />
                  </div>
                  <img
                    src={close}
                    alt=""
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      width: "10px",
                      height: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => closeContextModal("id")}
                  />
                </div>
              )}

              {isShownState.id && (
                <span
                  onClick={() => openContextModal("id")}
                  style={{
                    fontSize: `${sizes.id}px`,
                    color: colors.id,
                    fontFamily: fonts.id,
                    justifyItems: alignments.id,
                  }}
                >
                  ID: {account?.gameId}
                </span>
              )}
            </div>

            <div
              className="account-details"
              style={{
                position: "absolute",
                left: positions.server.x,
                top: positions.server.y,
                fontSize: sizes.server,
                cursor: draggingStates.server ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("server", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {draggingStates.server && (
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-20px",
                    padding: "5px",
                    fontSize: "13px",
                    color: "#5010be",
                  }}
                >
                  Сервер
                </div>
              )}
              {contextModals.server && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button
                        onClick={() => updateSize("server", sizes.server++)}
                      >
                        +
                      </button>
                      <span>{sizes.server}</span>
                      <button
                        onClick={() => updateSize("server", sizes.server--)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      closeCostumes("server");
                      closeContextModal("server");
                    }}
                  >
                    <h6>Удалить</h6>
                    <img src={deleteIcon} alt="" />
                  </div>
                  <div
                    id="color"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h6>Цвет</h6>
                    <img src={rainbow} alt="" style={{ width: "20px" }} />
                    <input
                      type="color"
                      value={colors.server}
                      onChange={() => handleColorChange("server")}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option
                      value="Arial"
                      onClick={() => updateFont("server", "Arial")}
                    >
                      Arial
                    </option>
                    <option
                      value="Open Sans"
                      onClick={() => updateFont("server", "Open Sans")}
                    >
                      Open Sans
                    </option>
                    <option
                      value="Inter"
                      onClick={() => updateFont("server", "Inter")}
                    >
                      Inter
                    </option>
                  </select>

                  <div className="btns">
                    <img
                      src={alignLeft}
                      alt=""
                      onClick={() => updateFont("server", "left")}
                    />
                    <img
                      src={alignCenter}
                      alt=""
                      onClick={() => updateFont("server", "center")}
                    />
                    <img
                      src={alignRight}
                      alt=""
                      onClick={() => updateFont("server", "right")}
                    />
                  </div>
                  <img
                    src={close}
                    alt=""
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      width: "10px",
                      height: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => closeContextModal("server")}
                  />
                </div>
              )}

              {isShownState.server && (
                <span
                  onClick={() => openContextModal("server")}
                  style={{
                    fontSize: `${sizes.server}px`,
                    color: colors.server,
                    fontFamily: fonts.server,
                    justifyItems: alignments.server,
                  }}
                >
                  Сервер: {account?.gameServer}
                </span>
              )}
            </div>
          </div>

          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Image ${index}`}
              style={{
                width: sizes.image,
                position: "absolute",
                left: image.position.x,
                top: image.position.y,
              }}
              onMouseDown={(e) => handleImageMouseDown(image.id, e)}
              onMouseMove={handleImageMouseMove}
              onMouseUp={handleImageMouseUp}
              onClick={() => handleImageClick(image.position)}
            />
          ))}

          {contextModals.image && (
            <div
              className="context-modal"
              style={{
                position: "absolute",
                left: positions.modal.x,
                top: positions.modal.y,
                width: "250px",
              }}
            >
              <div className="fz">
                <h6>Размер картинки</h6>
                <div className="btns">
                  <button onClick={() => updateSize("image", sizes.image++)}>
                    +
                  </button>
                  <span>{sizes.image}</span>
                  <button onClick={() => updateSize("image", sizes.image--)}>
                    -
                  </button>
                </div>
              </div>
              <div className="del">
                <h6>Удалить</h6>
                <img src={deleteIcon} alt="" />
              </div>
              <img
                src={close}
                alt=""
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  width: "10px",
                  height: "10px",
                  cursor: "pointer",
                }}
                onClick={() => closeContextModal("image")}
              />
            </div>
          )}

          {textElements.map((element) => (
            <div
              key={element.id}
              style={{
                position: "absolute",
                left: element.x,
                top: element.y,
                cursor:
                  isDraggingText && draggedTextId === element.id
                    ? "grabbing"
                    : "default",
                fontSize: sizes.text,
              }}
              onMouseDown={(e) => handleMouseDownText(element.id, e)}
              onMouseMove={handleMouseMoveText}
              onMouseUp={handleMouseUpText}
            >
              {editingTextElementId === element.id ? (
                <input
                  type="text"
                  className="text-input"
                  value={editingText}
                  onChange={handleTextChange}
                  onBlur={saveTextElement}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      saveTextElement();
                    }
                  }}
                  autoFocus
                />
              ) : (
                <div
                  style={{
                    outline: element.isEditing ? "1px solid blue" : "none",
                    padding: "10px",
                    cursor: "text",
                  }}
                  onDoubleClick={() => handleDoubleClick(element.id)}
                >
                  {element.text}
                </div>
              )}
            </div>
          ))}

          {modal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Вы уверены что добавили все элементы на макет?</h2>
                <div className="btns">
                  <button className="auth-btn2" onClick={() => setModal(false)}>
                    Не уверен
                  </button>
                  <button className="auth-btn" onClick={handleSave}>
                    Уверен
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
