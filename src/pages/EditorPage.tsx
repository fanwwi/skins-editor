import React, { useEffect, useState } from "react";
import rainbow from "../img/rainbow-ball.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getOneAccount,
  getUserAss,
  getUserCostumes,
} from "../store/actions/account.action";
import iconImage from "../img/image-icon.png";

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
  useEffect(() => {
    localStorage.setItem("currentAccount", "1");
  });
  const accountId = localStorage.getItem("currentAccount");
  const { userCostumes } = useAppSelector((state) => state.accounts);
  const { userAss } = useAppSelector((state) => state.accounts);
  const { account } = useAppSelector((state) => state.accounts);

  const [costumeS, setCostumeS] = useState(false);
  const [costumeSS, setCostumeSS] = useState(false);
  const [costumeA, setCostumeA] = useState(false);
  const [ass, setAss] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [canvasSize, setCanvasSize] = useState(700);
  const [fontSize, setFontSize] = useState(16);

  const [costumeSPosition, setCostumeSPosition] = useState({ x: 0, y: 0 });
  const [costumeSSPosition, setCostumeSSPosition] = useState({ x: 0, y: 0 });
  const [costumeAPosition, setCostumeAPosition] = useState({ x: 0, y: 0 });
  const [assPosition, setAssPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [isDraggingCostumeS, setIsDraggingCostumeS] = useState(false);
  const [isDraggingCostumeSS, setIsDraggingCostumeSS] = useState(false);
  const [isDraggingCostumeA, setIsDraggingCostumeA] = useState(false);
  const [isDraggingAss, setIsDraggingAss] = useState(false);
  const [costumeSize, setCostumeSize] = useState(150);

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [editingTextElementId, setEditingTextElementId] = useState<
    number | null
  >(null);
  const [editingText, setEditingText] = useState<string>("");

  const dispatch = useAppDispatch();

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

  const handleDoubleClick = (id: number) => {
    const element = textElements.find((element) => element.id === id);
    if (element) {
      setEditingTextElementId(id);
      setEditingText(element.text);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
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
              <span>Размер костюмов:</span>
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
        </div>
        <div
          className="canva"
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

          {textElements.map((element) => (
            <div
              key={element.id}
              style={{
                position: "absolute",
                left: element.x,
                top: element.y,
                cursor: "default",
                fontSize: element.fontSize,
              }}
              onMouseDown={(e) => handleMouseDown(element.id, e)}
              onDoubleClick={() => handleDoubleClick(element.id)}
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
                >
                  {element.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
