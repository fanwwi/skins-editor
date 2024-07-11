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
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../img/user-image.jpg";
import logo from "../img/logo.png";
import deleteIcon from "../img/delete-icon.png";
import alignLeft from "../img/alignLeft.png";
import alignRight from "../img/alignRight.png";
import alignCenter from "../img/alignCenter.png";
import close from "../img/close.png";
import reset from "../img/reset.png";

interface TextElement {
  id: number;
  text: string;
  isEditing: boolean;
  x: number;
  y: number;
  fontSize: number;
}

interface CostumesType {
  costume: string;
  author: string;
  category: string;
  bigAuthor: string;
  id: string;
  x?: number;
  y?: number;
}

interface AssessoirsType {
  assessoir: string;
  character: string;
  bigAuthor: string;
  id: string;
  x?: number;
  y?: number;
}

interface IconType {
  id: string | null;
  src: string;
  position: {
    x: number;
    y: number;
  };
}

const EditorPage: React.FC = () => {
  const accountId = localStorage.getItem("currentAccount");
  const { userCostumes } = useAppSelector((state) => state.accounts);
  const { userAss } = useAppSelector((state) => state.accounts);
  const { account } = useAppSelector((state) => state.accounts);

  const [costumeS, setCostumeS] = useState(false);
  const [costumeSS, setCostumeSS] = useState(false);
  const [costumeA, setCostumeA] = useState(false);
  const [ass, setAss] = useState(false);
  const [nickname, setNickname] = useState(false);
  const [gameAccount, setGameAccount] = useState(false);
  const [id, setId] = useState(false);
  const [server, setServer] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [canvasSize, setCanvasSize] = useState(700);
  const [fontSize, setFontSize] = useState(16);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [draggedTextId, setDraggedTextId] = useState<number | null>(null);
  const [startDragOffset, setStartDragOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [images, setImages] = useState<
    { id: string; src: string; position: { x: number; y: number } }[]
  >([]);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [draggedImageId, setDraggedImageId] = useState<string | null>(null);
  const [startImageOffset, setStartImageOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [costumeSPosition, setCostumeSPosition] = useState({ x: 0, y: 0 });
  const [costumeSSPosition, setCostumeSSPosition] = useState({ x: 0, y: 0 });
  const [costumeAPosition, setCostumeAPosition] = useState({ x: 0, y: 0 });
  const [assPosition, setAssPosition] = useState({ x: 0, y: 0 });
  const [nicknamePosition, setNicknamePosition] = useState({ x: 0, y: 0 });
  const [gameAccountPosition, setGameAccountPosition] = useState({
    x: 0,
    y: 0,
  });
  const [idPosition, setIdPosition] = useState({ x: 0, y: 0 });
  const [serverPosition, setServerPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [isDraggingCostumeS, setIsDraggingCostumeS] = useState(false);
  const [isDraggingCostumeSS, setIsDraggingCostumeSS] = useState(false);
  const [isDraggingCostumeA, setIsDraggingCostumeA] = useState(false);
  const [isDraggingAss, setIsDraggingAss] = useState(false);
  const [isDraggingNickname, setIsDraggingNickname] = useState(false);
  const [isDraggingAccount, setIsDraggingAccount] = useState(false);
  const [isDraggingId, setIsDraggingId] = useState(false);
  const [isDraggingServer, setIsDraggingServer] = useState(false);
  const [imgSize, setImgSize] = useState(150);
  const [activeTab, setActiveTab] = useState("content");

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [imageModal, setImageModal] = useState({ x: 0, y: 0 });

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [editingTextElementId, setEditingTextElementId] = useState<
    number | null
  >(null);
  const [editingText, setEditingText] = useState<string>("");
  const [modal, setModal] = useState(false);

  const initialCostumeSizes = userCostumes ? userCostumes.map(() => 150) : [];

  const [contextModalCostumesS, setContextModalCostumesS] = useState(false);
  const [contextModalCostumesSS, setContextModalCostumesSS] = useState(false);
  const [contextModalCostumesA, setContextModalCostumesA] = useState(false);
  const [contextModalAss, setContextModalCostumesAss] = useState(false);
  const [contextModalImage, setContextModalImage] = useState(false);
  const [contextModalNickname, setContextModalNickname] = useState(false);
  const [contextModalServer, setContextModalServer] = useState(false);
  const [contextModalAccount, setContextModalAccount] = useState(false);
  const [contextModalId, setContextModalId] = useState(false);

  const [nicknameSize, setNicknameSize] = useState(16);
  const [serverSize, setServerSize] = useState(16);
  const [accountSize, setAccountSize] = useState(16);
  const [idSize, setIdSize] = useState(16);
  const [costumeSizesS, setCostumeSizesS] = useState(initialCostumeSizes);
  const [costumeSizesSS, setCostumeSizesSS] = useState(initialCostumeSizes);
  const [costumeSizesA, setCostumeSizesA] = useState(initialCostumeSizes);
  const [costumeSizesAss, setCostumeSizesAss] = useState(initialCostumeSizes);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneAccount(accountId!));
    dispatch(getUserCostumes(accountId!));
    dispatch(getUserAss(accountId!));
  }, [dispatch]);

  const increaseCanvasSize = () => {
    if (canvasSize < 1000) {
      setCanvasSize(canvasSize + 100);
    }
  };

  const decreaseCanvasSize = () => {
    if (canvasSize > 500) {
      setCanvasSize(canvasSize - 100);
    }
  };

  const increaseCostumeSize = (id: any, category: any) => {
    switch (category) {
      case "S":
        setCostumeSizesS((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) + 5,
        }));
        break;
      case "SS":
        setCostumeSizesSS((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) + 5,
        }));
        break;
      case "A":
        setCostumeSizesA((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) + 5,
        }));
        break;
      case "Ass":
        setCostumeSizesAss((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) + 5,
        }));
        break;
      default:
        break;
    }
  };

  const decreaseCostumeSize = (id: any, category: any) => {
    switch (category) {
      case "S":
        setCostumeSizesS((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) - 5,
        }));
        break;
      case "SS":
        setCostumeSizesSS((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) - 5,
        }));
        break;
      case "A":
        setCostumeSizesA((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) - 5,
        }));
        break;
      case "Ass":
        setCostumeSizesAss((prevSizes) => ({
          ...prevSizes,
          [id]: (prevSizes[id] || 150) - 5,
        }));
        break;
      default:
        break;
    }
  };

  const increaseAccountSize = () => {
    setAccountSize((prevSize) => prevSize + 2);
  };

  const decreaseAccountSize = () => {
    setAccountSize((prevSize) => prevSize - 2);
  };

  const increaseNicknameSize = () => {
    setNicknameSize((prevSize) => prevSize + 2);
  };

  const decreaseNicknameSize = () => {
    setNicknameSize((prevSize) => prevSize - 2);
  };

  const increaseServerSize = () => {
    setServerSize((prevSize) => prevSize + 2);
  };

  const decreaseServerSize = () => {
    setServerSize((prevSize) => prevSize - 2);
  };

  const increaseIdSize = () => {
    setIdSize((prevSize) => prevSize + 2);
  };

  const decreaseIdSize = () => {
    setIdSize((prevSize) => prevSize - 2);
  };

  const increaseImgSize = () => {
    setImgSize((prevSize) => prevSize + 5);
  };

  const decreaseImgSize = () => {
    setImgSize((prevSize) => prevSize - 5);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeColor = (color: string) => {
    setBackgroundColor(color);
    handleCloseModal();
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundImage(e.target.value);
  };

  const addTextElement = () => {
    const newTextElement: TextElement = {
      id: textElements.length,
      text: "Новый текст",
      isEditing: false,
      x: 50,
      y: 50,
      fontSize: fontSize,
    };
    setTextElements([...textElements, newTextElement]);
  };

  const handleMouseDown = (
    id: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    setIsDragging(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
    switch (id) {
      case 1:
        setIsDraggingCostumeS(true);
        break;
      case 2:
        setIsDraggingCostumeSS(true);
        break;
      case 3:
        setIsDraggingCostumeA(true);
        break;
      case 4:
        setIsDraggingAss(true);
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const dx = event.clientX - mousePosition.x;
    const dy = event.clientY - mousePosition.y;
    setMousePosition({ x: event.clientX, y: event.clientY });
    if (isDraggingCostumeS) {
      setCostumeSPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
    if (isDraggingCostumeSS) {
      setCostumeSSPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
    if (isDraggingCostumeA) {
      setCostumeAPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
    if (isDraggingAss) {
      setAssPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingCostumeS(false);
    setIsDraggingCostumeSS(false);
    setIsDraggingCostumeA(false);
    setIsDraggingAss(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
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
      setStartDragOffset({
        x: event.clientX - element.x,
        y: event.clientY - element.y,
      });
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
          const newX = event.clientX - startDragOffset.x;
          const newY = event.clientY - startDragOffset.y;
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
    const dx = event.clientX - mousePosition.x;
    const dy = event.clientY - mousePosition.y;
    setMousePosition({ x: event.clientX, y: event.clientY });
    if (isDraggingAccount) {
      setGameAccountPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
    if (isDraggingNickname) {
      setNicknamePosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
    if (isDraggingId) {
      setIdPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
    if (isDraggingServer) {
      setServerPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
  };

  const handleMouseUpAccount = () => {
    setIsDraggingAccount(false);
    setIsDraggingNickname(false);
    setIsDraggingId(false);
    setIsDraggingServer(false);
  };

  const handleAccountMouseDown = (
    elementId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    switch (elementId) {
      case "gameAccount":
        setIsDraggingAccount(true);
        break;
      case "nickname":
        setIsDraggingNickname(true);
        break;
      case "id":
        setIsDraggingId(true);
        break;
      case "server":
        setIsDraggingServer(true);
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
      setIsDraggingImage(true);
      setDraggedImageId(id);
      setStartImageOffset({
        x: event.clientX - image.position.x,
        y: event.clientY - image.position.y,
      });
    }
  };

  const handleImageMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    if (isDraggingImage && draggedImageId !== null) {
      const updatedImages = images.map((img) => {
        if (img.id === draggedImageId) {
          return {
            ...img,
            position: {
              x: event.clientX - startImageOffset.x,
              y: event.clientY - startImageOffset.y,
            },
          };
        }
        return img;
      });
      setImages(updatedImages);
    }
  };

  const handleImageMouseUp = () => {
    setIsDraggingImage(false);
    setDraggedImageId(null);
  };

  const handleImageClick = (position: any) => {
    setImageModal({ x: position.x, y: position.y - 100 });
    setContextModalImage(true);
  };

  const [selectedColorServer, setSelectedColorServer] = useState("#000000"); // начальный цвет
  const [selectedColorId, setSelectedColorId] = useState("#000000"); // начальный цвет
  const [selectedColorAccount, setSelectedColorAccount] = useState("#000000"); // начальный цвет
  const [selectedColorNickname, setSelectedColorNickname] = useState("#000000"); // начальный цвет

  const handleColorServerChange = (event: any) => {
    setSelectedColorServer(event.target.value);
  };

  const handleColorIdChange = (event: any) => {
    setSelectedColorId(event.target.value);
  };

  const handleColorAccountChange = (event: any) => {
    setSelectedColorAccount(event.target.value);
  };

  const handleColorNicknameChange = (event: any) => {
    setSelectedColorNickname(event.target.value);
  };

  return (
    <div className="list">
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
        <h2>
          Визуальная карточка аккаунта -{" "}
          <span className="blue-text">
            {account?.gameAccount || "Ошибка сети"}
          </span>
        </h2>
        <img
          src={userIcon}
          alt="userIcon"
          style={{ width: "70px", cursor: "pointer" }}
        />
      </div>
      <hr />
      <div className="options">
        <div className="container">
          <div className="block-top">
            <h3 id="color" onClick={handleOpenModal}>
              <img src={rainbow} alt="" /> Заливка{" "}
              <input
                type="color"
                onChange={(e) => handleChangeColor(e.target.value)}
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
                <div className="fz">{canvasSize}px</div>
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
                <button onClick={() => setCostumeS(true)}>Костюмы S</button>
                <button onClick={() => setCostumeSS(true)}>Костюмы SS</button>
                <button onClick={() => setCostumeA(true)}>Костюмы A</button>
                <button onClick={() => setAss(true)}>Аксессуары</button>
              </div>
            )}
            {activeTab === "account-data" && (
              <div className="costumes-block">
                <button onClick={() => setNickname(true)}>
                  Никнэйм
                  <span>{account?.gameNickname}</span>
                </button>
                <button onClick={() => setGameAccount(true)}>
                  Имя акканута
                  <span>{account?.gameAccount}</span>
                </button>
                <button onClick={() => setServer(true)}>
                  Сервер
                  <span>{account?.gameServer}</span>
                </button>
                <button onClick={() => setId(true)}>
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
                left: costumeSPosition.x,
                top: costumeSPosition.y,
                cursor: isDraggingCostumeS ? "grabbing" : "default",
              }}
              onMouseDown={(e) => handleMouseDown(1, e)}
            >
              {isDraggingCostumeS && (
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
              {costumeS &&
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
                        height: `${costumeSizesS[Number(costume.id)] || 155}px`,
                      }}
                    >
                      {contextModalCostumesS && (
                        <div className="context-modal">
                          <div className="fz">
                            <div className="btns">
                              <button
                                onClick={() =>
                                  increaseCostumeSize(costume.id, "S")
                                }
                              >
                                +
                              </button>
                              <span>
                                {costumeSizesS[Number(costume.id)] || 155}
                              </span>
                              <button
                                onClick={() =>
                                  decreaseCostumeSize(costume.id, "S")
                                }
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <div
                            className="del"
                            onClick={() => {
                              costumeSizesS[Number(costume.id)] = 155; // Сбрасываем размер
                              setCostumeSizesS({ ...costumeSizesS }); // Обновляем состояние
                            }}
                          >
                            <h6>Сброс</h6>
                            <img src={reset} alt="" />
                          </div>

                          <div
                            className="del"
                            onClick={() => setCostumeS(false)}
                          >
                            <h6>Удалить</h6>
                            <img src={deleteIcon} alt="" />
                          </div>

                          <select name="" id="">
                            <option value="">Добавить в группу</option>
                            <option value="">Костюмы SS</option>
                            <option value="">Костюмы A</option>
                          </select>

                          <div className="btns">
                            <img src={alignLeft} alt="" />
                            <img src={alignCenter} alt="" />
                            <img src={alignRight} alt="" />
                          </div>

                          <img
                            src={close}
                            alt=""
                            onClick={() => setContextModalCostumesS(false)}
                            className="close"
                            style={{ width: "10px", height: "10px" }}
                          />
                        </div>
                      )}

                      <img
                        src={costume.costume}
                        alt="Costume"
                        style={{
                          height: `${
                            costumeSizesS[Number(costume.id)] || 155
                          }px`,
                        }}
                        onClick={() => setContextModalCostumesS(true)}
                      />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: costumeSSPosition.x,
                top: costumeSSPosition.y,
                cursor: isDraggingCostumeSS ? "grabbing" : "default",
              }}
              onMouseDown={(e) => handleMouseDown(2, e)}
            >
              {isDraggingCostumeSS && (
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
              {costumeSS &&
                userCostumes
                  ?.filter((cost) => cost.category === "SS")
                  ?.map((costume) => (
                    <div
                      key={costume.id}
                      className="display-cost"
                      style={{
                        left: costume.x || 0,
                        top: costume.y || 0,
                        height: `${
                          costumeSizesSS[Number(costume.id)] || 155
                        }px`,
                      }}
                    >
                      {contextModalCostumesSS && (
                        <div className="context-modal">
                          <div className="fz">
                            <div className="btns">
                              <button
                                onClick={() =>
                                  increaseCostumeSize(costume.id, "SS")
                                }
                              >
                                +
                              </button>
                              <span>
                                {costumeSizesSS[Number(costume.id)] || 155}
                              </span>
                              <button
                                onClick={() =>
                                  decreaseCostumeSize(costume.id, "SS")
                                }
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <div
                            className="del"
                            onClick={() => {
                              costumeSizesSS[Number(costume.id)] = 155; // Сбрасываем размер
                              setCostumeSizesSS({ ...costumeSizesSS }); // Обновляем состояние
                            }}
                          >
                            <h6>Сброс</h6>
                            <img src={reset} alt="" />
                          </div>

                          <div
                            className="del"
                            onClick={() => setCostumeSS(false)}
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
                            <img src={alignLeft} alt="" />
                            <img src={alignCenter} alt="" />
                            <img src={alignRight} alt="" />
                          </div>

                          <img
                            src={close}
                            alt=""
                            onClick={() => setContextModalCostumesSS(false)}
                            className="close"
                            style={{ width: "10px", height: "10px" }}
                          />
                        </div>
                      )}
                      <img
                        src={costume.costume}
                        alt="Costume"
                        onClick={() => {
                          setContextModalCostumesSS(true);
                        }}
                        style={{
                          height: `${
                            costumeSizesSS[Number(costume.id)] || 155
                          }px`,
                        }}
                      />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: costumeAPosition.x,
                top: costumeAPosition.y,
                cursor: isDraggingCostumeA ? "grabbing" : "default",
              }}
              onMouseDown={(e) => handleMouseDown(3, e)}
            >
              {isDraggingCostumeA && (
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
              {costumeA &&
                userCostumes
                  ?.filter((cost) => cost.category === "A")
                  ?.map((costume) => (
                    <div
                      key={costume.id}
                      className="display-cost"
                      style={{
                        left: costume.x || 0,
                        top: costume.y || 0,
                        height: `${costumeSizesA[Number(costume.id)] || 155}px`,
                      }}
                    >
                      {contextModalCostumesA && (
                        <div className="context-modal">
                          <div className="fz">
                            <div className="btns">
                              <button
                                onClick={() =>
                                  increaseCostumeSize(costume.id, "A")
                                }
                              >
                                +
                              </button>
                              <span>
                                {costumeSizesA[Number(costume.id)] || 155}
                              </span>
                              <button
                                onClick={() =>
                                  decreaseCostumeSize(costume.id, "A")
                                }
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <div
                            className="del"
                            onClick={() => {
                              costumeSizesA[Number(costume.id)] = 155; // Сбрасываем размер
                              setCostumeSizesA({ ...costumeSizesA }); // Обновляем состояние
                            }}
                          >
                            <h6>Сброс</h6>
                            <img src={reset} alt="" />
                          </div>

                          <div
                            className="del"
                            onClick={() => setCostumeA(false)}
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
                            <img src={alignLeft} alt="" />
                            <img src={alignCenter} alt="" />
                            <img src={alignRight} alt="" />
                          </div>

                          <img
                            src={close}
                            alt=""
                            onClick={() => setContextModalCostumesA(false)}
                            className="close"
                            style={{ width: "10px", height: "10px" }}
                          />
                        </div>
                      )}
                      <img
                        src={costume.costume}
                        alt="Costume"
                        onClick={() => {
                          setContextModalCostumesA(true);
                        }}
                        style={{
                          height: `${
                            costumeSizesA[Number(costume.id)] || 155
                          }px`,
                        }}
                      />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: assPosition.x,
                top: assPosition.y,
                cursor: isDraggingAss ? "grabbing" : "default",
              }}
              onMouseDown={(e) => handleMouseDown(4, e)}
            >
              {isDraggingAss && (
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
              {ass &&
                userAss?.map((ass) => (
                  <div
                    key={ass.id}
                    className="display-cost"
                    style={{
                      left: ass.x || 0,
                      top: ass.y || 0,
                      height: `${costumeSizesAss[Number(ass.id)] || 155}px`,
                    }}
                  >
                    {contextModalAss && (
                      <div className="context-modal">
                        <div className="fz">
                          <div className="btns">
                            <button
                              onClick={() => increaseCostumeSize(ass.id, "Ass")}
                            >
                              +
                            </button>
                            <span>
                              {costumeSizesAss[Number(ass.id)] || 155}
                            </span>
                            <button
                              onClick={() => decreaseCostumeSize(ass.id, "Ass")}
                            >
                              -
                            </button>
                          </div>
                        </div>

                        <div
                          className="del"
                          onClick={() => {
                            costumeSizesAss[Number(ass.id)] = 155; // Сбрасываем размер
                            setCostumeSizesAss({ ...costumeSizesAss }); // Обновляем состояние
                          }}
                        >
                          <h6>Сброс</h6>
                          <img src={reset} alt="" />
                        </div>

                        <div className="del" onClick={() => setAss(false)}>
                          <h6>Удалить</h6>
                          <img src={deleteIcon} alt="" />
                        </div>

                        <select name="" id="">
                          <option value="">Добавить в группу</option>
                          <option value="">Костюмы SS</option>
                          <option value="">Костюмы S</option>
                        </select>

                        <div className="btns">
                          <img src={alignLeft} alt="" />
                          <img src={alignCenter} alt="" />
                          <img src={alignRight} alt="" />
                        </div>

                        <img
                          src={close}
                          alt=""
                          onClick={() => setContextModalCostumesAss(false)}
                          className="close"
                          style={{ width: "10px", height: "10px" }}
                        />
                      </div>
                    )}

                    <img
                      src={ass.assessoir}
                      alt="Costume"
                      onClick={() => {
                        setContextModalCostumesAss(true);
                      }}
                      style={{
                        height: `${costumeSizesAss[Number(ass.id)] || 155}px`,
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
                left: gameAccountPosition.x,
                top: gameAccountPosition.y,
                fontSize: fontSize,
                cursor: isDraggingAccount ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("gameAccount", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {isDraggingAccount && (
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
              {contextModalAccount && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button onClick={increaseAccountSize}>+</button>
                      <span>{accountSize}</span>
                      <button onClick={decreaseAccountSize}>-</button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      setGameAccount(false);
                      setContextModalAccount(false);
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
                      value={selectedColorAccount}
                      onChange={handleColorAccountChange}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option value="Arial">Arial</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Inter">Inter</option>
                  </select>

                  <div className="btns">
                    <img src={alignLeft} alt="" />
                    <img src={alignCenter} alt="" />
                    <img src={alignRight} alt="" />
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
                    onClick={() => setContextModalAccount(false)}
                  />
                </div>
              )}

              {gameAccount && (
                <h3
                  onClick={() => setContextModalAccount(true)}
                  style={{
                    fontSize: `${accountSize}px`,
                    color: selectedColorAccount,
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
                left: nicknamePosition.x,
                top: nicknamePosition.y,
                fontSize: fontSize,
                cursor: isDraggingAccount ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("nickname", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {isDraggingNickname && (
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
              {contextModalNickname && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button onClick={increaseNicknameSize}>+</button>
                      <span>{nicknameSize}</span>
                      <button onClick={decreaseNicknameSize}>-</button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      setNickname(false);
                      setContextModalNickname(false);
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
                      value={selectedColorNickname}
                      onChange={handleColorNicknameChange}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option value="">Arial</option>
                    <option value="">Open Sans</option>
                    <option value="">Inter</option>
                  </select>

                  <div className="btns">
                    <img src={alignLeft} alt="" />
                    <img src={alignCenter} alt="" />
                    <img src={alignRight} alt="" />
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
                    onClick={() => setContextModalNickname(false)}
                  />
                </div>
              )}

              {nickname && (
                <span
                  onClick={() => setContextModalNickname(true)}
                  style={{
                    fontSize: `${nicknameSize}px`,
                    color: selectedColorNickname,
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
                left: idPosition.x,
                top: idPosition.y,
                fontSize: fontSize,
                cursor: isDraggingAccount ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("id", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {isDraggingId && (
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
              {contextModalId && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button onClick={increaseIdSize}>+</button>
                      <span>{idSize}</span>
                      <button onClick={decreaseIdSize}>-</button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      setId(false);
                      setContextModalId(false);
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
                      value={selectedColorId}
                      onChange={handleColorIdChange}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option value="Arial">Arial</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Inter">Inter</option>
                  </select>

                  <div className="btns">
                    <img src={alignLeft} alt="" />
                    <img src={alignCenter} alt="" />
                    <img src={alignRight} alt="" />
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
                    onClick={() => setContextModalId(false)}
                  />
                </div>
              )}

              {id && (
                <span
                  onClick={() => setContextModalId(true)}
                  style={{
                    fontSize: `${idSize}px`,
                    color: selectedColorId,
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
                left: serverPosition.x,
                top: serverPosition.y,
                fontSize: fontSize,
                cursor: isDraggingAccount ? "grabbing" : "default",
              }}
              onMouseDown={(e) => {
                handleAccountMouseDown("server", e);
              }}
              onMouseMove={handleAccountMouseMove}
              onMouseUp={handleMouseUpAccount}
            >
              {isDraggingServer && (
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
              {contextModalServer && (
                <div className="context-modal" style={{ marginBottom: "10px" }}>
                  <div className="fz">
                    <h6>Размер шрифта</h6>
                    <div className="btns">
                      <button onClick={increaseServerSize}>+</button>
                      <span>{serverSize}</span>
                      <button onClick={decreaseServerSize}>-</button>
                    </div>
                  </div>
                  <div
                    className="del"
                    onClick={() => {
                      setServer(false);
                      setContextModalServer(false);
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
                      value={selectedColorServer}
                      onChange={handleColorServerChange}
                      style={{ width: "20px" }}
                    />
                  </div>

                  <select name="" id="">
                    <option value="">Выберите шрифт</option>
                    <option value="Arial">Arial</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Inter">Inter</option>
                  </select>

                  <div className="btns">
                    <img src={alignLeft} alt="" />
                    <img src={alignCenter} alt="" />
                    <img src={alignRight} alt="" />
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
                    onClick={() => setContextModalServer(false)}
                  />
                </div>
              )}

              {server && (
                <span
                  onClick={() => setContextModalServer(true)}
                  style={{
                    fontSize: `${serverSize}px`,
                    color: selectedColorServer,
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
                width: imgSize,
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

          {contextModalImage && (
            <div
              className="context-modal"
              style={{
                position: "absolute",
                left: modalPosition.x,
                top: modalPosition.y,
                width: "250px",
              }}
            >
              <div className="fz">
                <h6>Размер картинки</h6>
                <div className="btns">
                  <button onClick={increaseImgSize}>+</button>
                  <span>{imgSize}</span>
                  <button onClick={decreaseImgSize}>-</button>
                </div>
              </div>
              <div className="deleteCostume">
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
                  cursor: "pointer",
                }}
                onClick={() => setContextModalImage(false)}
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
                fontSize: element.fontSize,
              }}
              onMouseDown={(e) => handleMouseDownText(element.id, e)}
              onMouseMove={handleMouseMoveText}
              onMouseUp={handleMouseUpText}
              // onMouseEnter={() => handleTextClick(element.x && element.y)}
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
