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

  const [costumesPosition, setCostumesPosition] = useState({ x: 0, y: 0 });
  const [isDraggingCostumes, setIsDraggingCostumes] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  const [editingTextElementId, setEditingTextElementId] = useState<
    number | null
  >(null);
  const [editingText, setEditingText] = useState<string>("");
   const [draggingElementId, setDraggingElementId] = useState<number | null>(
    null
  );

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
    setDraggingElementId(id);
    setIsDragging(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && draggingElementId !== null) {
      const dx = event.clientX - mousePosition.x;
      const dy = event.clientY - mousePosition.y;
      setMousePosition({ x: event.clientX, y: event.clientY });
      setTextElements((prevElements) =>
        prevElements.map((element) =>
          element.id === draggingElementId
            ? { ...element, x: element.x + dx, y: element.y + dy }
            : element
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingElementId(null);
  };

  const handleCostumesMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingCostumes(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleCostumesMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingCostumes) {
      const dx = event.clientX - mousePosition.x;
      const dy = event.clientY - mousePosition.y;
      setMousePosition({ x: event.clientX, y: event.clientY });
      setCostumesPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
  };

  const handleCostumesMouseUp = () => {
    setIsDraggingCostumes(false);
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
                left: costumesPosition.x,
                top: costumesPosition.y,
                cursor: isDraggingCostumes ? "grabbing" : "default",
              }}
              onMouseDown={handleCostumesMouseDown}
              onMouseMove={handleCostumesMouseMove}
              onMouseUp={handleCostumesMouseUp}
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
                      <img src={costume.costume} alt="Costume" />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: costumesPosition.x,
                top: costumesPosition.y,
                cursor: isDraggingCostumes ? "grabbing" : "default",
              }}
              onMouseDown={handleCostumesMouseDown}
              onMouseMove={handleCostumesMouseMove}
              onMouseUp={handleCostumesMouseUp}
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
                      <img src={costume.costume} alt="Costume" />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: costumesPosition.x,
                top: costumesPosition.y,
                cursor: isDraggingCostumes ? "grabbing" : "default",
              }}
              onMouseDown={handleCostumesMouseDown}
              onMouseMove={handleCostumesMouseMove}
              onMouseUp={handleCostumesMouseUp}
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
                      <img src={costume.costume} alt="Costume" />
                    </div>
                  ))}
            </div>

            <div
              className="display-costumes"
              style={{
                position: "absolute",
                left: costumesPosition.x,
                top: costumesPosition.y,
                cursor: isDraggingCostumes ? "grabbing" : "default",
              }}
              onMouseDown={handleCostumesMouseDown}
              onMouseMove={handleCostumesMouseMove}
              onMouseUp={handleCostumesMouseUp}
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
                    <img src={ass.assessoir} alt="Costume" />
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
                cursor:
                  isDragging && draggingElementId === element.id
                    ? "grabbing"
                    : "default",
                fontSize: element.fontSize,
              }}
              onMouseDown={(e) => handleMouseDown(element.id, e)}
              onDoubleClick={() => handleDoubleClick(element.id)}
            >
              {editingTextElementId === element.id ? (
                <input
                  type="text"
                  className="text-unput"
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
                    padding: "50px",
                    cursor: "text",
                  }}
                >
                  {element.text}
                </div>
              )}
            </div>
          ))}
        </div>
        ;
      </div>
    </div>
  );
};

export default EditorPage;
