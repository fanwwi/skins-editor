import React, { useEffect, useRef, useState } from "react";
import rainbow from "../img/rainbow-ball.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getOneAccount,
  getUserAss,
  getUserCostumes,
} from "../store/actions/account.action";
import iconImage from "../img/image-icon.png";
import { toJpeg } from "html-to-image";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [costumeSize, setCostumeSize] = useState(150);
  const [imgSize, setImgSize] = useState(150);

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [editingTextElementId, setEditingTextElementId] = useState<
    number | null
  >(null);
  const [editingText, setEditingText] = useState<string>("");
  const [modal, setModal] = useState(false);

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

  const increaseFontSize = () => {
    setTextElements((prevElements) =>
      prevElements.map((element) => ({
        ...element,
        fontSize:
          element.fontSize < 50 ? element.fontSize + 2 : element.fontSize,
      }))
    );
    setFontSize((prevFontSize) =>
      prevFontSize < 50 ? prevFontSize + 2 : prevFontSize
    );
  };

  const decreaseFontSize = () => {
    setTextElements((prevElements) =>
      prevElements.map((element) => ({
        ...element,
        fontSize:
          element.fontSize > 8 ? element.fontSize - 2 : element.fontSize,
      }))
    );
    setFontSize((prevFontSize) =>
      prevFontSize > 8 ? prevFontSize - 2 : prevFontSize
    );
  };

  const increaseCostumeSize = () => {
    setCostumeSize((prevSize) => prevSize + 5);
  };

  const decreaseCostumeSize = () => {
    setCostumeSize((prevSize) => prevSize - 5);
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
        navigate(`/payment/${accountId}`)
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
    const dx = event.clientX - mousePosition.x;
    const dy = event.clientY - mousePosition.y;
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

  return (
    <div className="list">
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

            <h3 id="text" onClick={addTextElement}>
              Добавить текст
            </h3>
            <div className="font-size">
              <button onClick={increaseFontSize}>+</button>
              <div className="fz">{fontSize}</div>
              <button onClick={decreaseFontSize}>-</button>
            </div>

            <div className="canva-size">
              <span>Размер холста:</span>
              <div className="down-block">
                <button onClick={increaseCanvasSize}>+</button>
                <div className="fz">{canvasSize}px</div>
                <button onClick={decreaseCanvasSize}>-</button>
              </div>
            </div>

            <div className="canva-size">
              <span>Размеры картинок:</span>
              <div className="down-block">
                <button onClick={increaseImgSize}>+</button>
                <div className="fz">{imgSize}px</div>
                <button onClick={decreaseImgSize}>-</button>
              </div>
            </div>

            <div className="canva-size">
              <span>Размеры костюмов:</span>
              <div className="down-block">
                <button onClick={increaseCostumeSize}>+</button>
                <div className="fz">{costumeSize}px</div>
                <button onClick={decreaseCostumeSize}>-</button>
              </div>
            </div>
          </div>

          <h2>
            Визуальная карточка аккаунта -{" "}
            <span className="blue-text">
              {account?.gameAccount || "Ошибка сети"}
            </span>
          </h2>
        </div>
      </div>
      <div className="center">
        <div className="costumes-block">
          <button onClick={() => setCostumeS(true)}>Костюмы S</button>
          <button onClick={() => setCostumeSS(true)}>Костюмы SS</button>
          <button onClick={() => setCostumeA(true)}>Костюмы A</button>
          <button onClick={() => setAss(true)}>Аксессуары</button>
          <button onClick={() => setNickname(true)}>Никнэйм</button>
          <button onClick={() => setGameAccount(true)}>Имя акканута</button>
          <button onClick={() => setServer(true)}>Сервер</button>
          <button onClick={() => setId(true)}>ID</button>
          <input id="img" placeholder="Добавить картинку" onChange={addImage} />
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
              {costumeS &&
                userCostumes
                  ?.filter((cost) => cost.category === "S")
                  ?.map((costume) => (
                    <div
                      key={costume.id}
                      className="display-cost"
                      style={{
                        left: costume.x || 0,
                        top: costume.y || 0,
                      }}
                    >
                      <img
                        src={costume.costume}
                        alt="Costume"
                        style={{ height: `${costumeSize}px` }}
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
                      }}
                    >
                      <img
                        src={costume.costume}
                        alt="Costume"
                        style={{ height: `${costumeSize}px` }}
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
                      }}
                    >
                      <img
                        src={costume.costume}
                        alt="Costume"
                        style={{ height: `${costumeSize}px` }}
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
              {ass &&
                userAss?.map((ass) => (
                  <div
                    key={ass.id}
                    className="display-cost"
                    style={{
                      left: ass.x || 0,
                      top: ass.y || 0,
                    }}
                  >
                    <img
                      src={ass.assessoir}
                      alt="Assessoir"
                      style={{ height: `${costumeSize}px` }}
                    />
                  </div>
                ))}
            </div>
          </div>

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
            {gameAccount && <h3>{account?.gameAccount}</h3>}
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
            {nickname && <span>{account?.gameNickname}</span>}
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
            {id && <span>{account?.gameId}</span>}
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
            {server && <span>{account?.gameServer}</span>}
          </div>

          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt="User Image"
              style={{
                position: "absolute",
                left: image.position.x,
                top: image.position.y,
                width: imgSize,
                cursor:
                  isDraggingImage && draggedImageId === image.id
                    ? "grabbing"
                    : "default",
              }}
              onMouseDown={(e) => handleImageMouseDown(image.id, e)}
              onMouseMove={handleImageMouseMove}
              onMouseUp={handleImageMouseUp}
            />
          ))}

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

          <button onClick={() => setModal(true)} className="save">
            Сохранить
          </button>

          {modal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Вы уверены что добавили все элементы на макет?</h2>
                <div className="btns">
                  <button className="auth-btn2" onClick={() => setModal(false)}>Не уверен</button>
                  <button className="auth-btn" onClick={handleSave}>Уверен</button>
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
