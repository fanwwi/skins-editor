import React, { useEffect, useState } from "react";
import rainbow from "../img/rainbow-ball.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getOneAccount,
  getUserAss,
  getUserCostumes,
} from "../store/actions/account.action";

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

  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [canvasSize, setCanvasSize] = useState(700);
  const [fontSize, setFontSize] = useState(16);

  const [isDragging, setIsDragging] = useState(false);
  const [draggingElementId, setDraggingElementId] = useState<number | null>(
    null
  );
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCostumes(accountId!));
    dispatch(getOneAccount(accountId!));
    dispatch(getUserAss(accountId!));
  }, [dispatch, accountId]);

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

  const [isDraggingCostumes, setIsDraggingCostumes] = useState(false);
  const [draggingCostumes, setDraggingCostumes] = useState<CostumesType[]>([]);

  const handleCostumeMouseDown = (id: number) => {
    const costume = userCostumes!.find((cost) => cost.id === id.toString());
    if (costume) {
      setDraggingCostumes([...draggingCostumes, costume]);
      setIsDraggingCostumes(true);
    }
  };

  const handleCostumeMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingCostumes) {
      const dx = event.clientX - mousePosition.x;
      const dy = event.clientY - mousePosition.y;
      setMousePosition({ x: event.clientX, y: event.clientY });
      setDraggingCostumes((prevCostumes) =>
        prevCostumes.map((costume) => ({
          ...costume,
          x: costume.x ? costume.x + dx : dx,
          y: costume.y ? costume.y + dy : dy,
        }))
      );
    }
  };

  const handleCostumeMouseUp = () => {
    setIsDraggingCostumes(false);
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
          <div
            className="display-costumes"
            onMouseMove={handleCostumeMouseMove}
            onMouseUp={handleCostumeMouseUp}
          >
            {costumeA &&
              userCostumes
                ?.filter((cost) => cost.category === "A")
                ?.reverse()
                ?.map((costume) => (
                  <div
                    key={costume.id}
                    className="display-cost"
                    style={{
                      position: "absolute",
                      left: costume.x || 0,
                      top: costume.y || 0,
                      cursor:
                        isDraggingCostumes &&
                        draggingCostumes.some((c) => c.id === costume.id)
                          ? "grabbing"
                          : "default",
                    }}
                    onMouseDown={() => handleCostumeMouseDown(+costume.id)}
                  >
                    <img src={costume.costume} alt="Costume" />
                  </div>
                ))}
          </div>

          <div
            className="display-costumes"
            onMouseMove={handleCostumeMouseMove}
            onMouseUp={handleCostumeMouseUp}
          >
            {costumeSS &&
              userCostumes
                ?.filter((cost) => cost.category === "SS")
                ?.reverse()
                ?.map((costume) => (
                  <div
                    key={costume.id}
                    className="display-cost"
                    style={{
                      position: "absolute",
                      left: costume.x || 0,
                      top: costume.y || 0,
                      cursor:
                        isDraggingCostumes &&
                        draggingCostumes.some((c) => c.id === costume.id)
                          ? "grabbing"
                          : "default",
                    }}
                    onMouseDown={() => handleCostumeMouseDown(+costume.id)}
                  >
                    <img src={costume.costume} alt="Costume" />
                  </div>
                ))}
          </div>

          <div
            className="display-costumes"
            onMouseMove={handleCostumeMouseMove}
            onMouseUp={handleCostumeMouseUp}
          >
            {costumeS &&
              userCostumes
                ?.filter((cost) => cost.category === "S")
                ?.reverse()
                ?.map((costume) => (
                  <div
                    key={costume.id}
                    className="display-cost"
                    style={{
                      position: "absolute",
                      left: costume.x || 0,
                      top: costume.y || 0,
                      cursor:
                        isDraggingCostumes &&
                        draggingCostumes.some((c) => c.id === costume.id)
                          ? "grabbing"
                          : "default",
                    }}
                    onMouseDown={() => handleCostumeMouseDown(+costume.id)}
                  >
                    <img src={costume.costume} alt="Costume" />
                  </div>
                ))}
          </div>

          <div
            className="display-costumes"
            onMouseMove={handleCostumeMouseMove}
            onMouseUp={handleCostumeMouseUp}
          >
            {ass &&
              userAss?.reverse()?.map((ass) => (
                <div
                  key={ass.id}
                  className="display-cost"
                  style={{
                    position: "absolute",
                    left: ass.x || 0,
                    top: ass.y || 0,
                    cursor:
                      isDraggingCostumes &&
                      draggingCostumes.some((c) => c.id === ass.id)
                        ? "grabbing"
                        : "default",
                  }}
                  onMouseDown={() => handleCostumeMouseDown(+ass.id)}
                >
                  <img src={ass.assessoir} alt="Costume" />
                </div>
              ))}
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
            >
              <div
                style={{
                  outline: element.isEditing ? "1px solid blue" : "none",
                  padding: "5px",
                  cursor: "text",
                }}
              >
                {element.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
