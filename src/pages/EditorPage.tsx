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
    };
    setTextElements([...textElements, newTextElement]);
  };

  const handleTextClick = (id: number) => {
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, isEditing: true } : element
      )
    );
  };

  const handleTextChange = (id: number, text: string) => {
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, text } : element
      )
    );
  };

  const handleBlur = (id: number) => {
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, isEditing: false } : element
      )
    );
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
              <button>+</button>
              <div className="fz">default</div>
              <button>-</button>
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
          <div className="display-costumes">
            {costumeS &&
              userCostumes
                ?.filter((cost) => cost.category === "S")
                ?.reverse()
                ?.map((costume) => (
                  <div key={costume.id} className="display-cost">
                    <img src={costume.costume} alt="Costume" />
                  </div>
                ))}
          </div>

          <div className="display-costumes">
            {costumeSS &&
              userCostumes
                ?.filter((cost) => cost.category === "SS")
                ?.reverse()
                ?.map((costume) => (
                  <div key={costume.id} className="display-cost">
                    <img src={costume.costume} alt="Costume" />
                  </div>
                ))}
          </div>

          <div className="display-costumes">
            {costumeA &&
              userCostumes
                ?.filter((cost) => cost.category === "A")
                ?.reverse()
                ?.map((costume) => (
                  <div key={costume.id} className="display-cost">
                    <img src={costume.costume} alt="Costume" />
                  </div>
                ))}
          </div>

          <div className="display-costumes">
            {ass &&
              userAss?.reverse()?.map((ass) => (
                <div key={ass.id} className="display-cost">
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
              }}
              onMouseDown={(e) => handleMouseDown(element.id, e)}
            >
              <div
                contentEditable={element.isEditing}
                onBlur={() => handleBlur(element.id)}
                onInput={(e) =>
                  handleTextChange(
                    element.id,
                    (e.target as HTMLDivElement).innerText
                  )
                }
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
