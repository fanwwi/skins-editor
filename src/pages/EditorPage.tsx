import React, { useState, MouseEvent, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getOneAccount } from "../store/actions/account.action";

const Editor = () => {
  const [background, setBackground] = useState("");
  const [text, setText] = useState("Введите текст");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#f0f0f0");
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState("#000000");
  const [showResizeHandle, setShowResizeHandle] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  const [costumesSS, setCostumesSS] = useState<any[]>([]);
  const [costumesS, setCostumesS] = useState<any[]>([]);
  const [costumesA, setCostumesA] = useState<any[]>([]);

  const { userCostumes } = useAppSelector((state) => state.accounts);
  const { account } = useAppSelector((state) => state.accounts);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getOneAccount(id));
    }
  }, [id, dispatch]);

  const handleAddText = () => {
    if (isEditable) {
      setIsTextEditing(true);
    }
  };

  const getUserCostumes = (category: string) => {
    if (!userCostumes) return;
    switch (category) {
      case 'SS':
        setCostumesSS(userCostumes.filter((costume: any) => costume.category === 'SS'));
        break;
      case 'S':
        setCostumesS(userCostumes.filter((costume: any) => costume.category === 'S'));
        break;
      case 'A':
        setCostumesA(userCostumes.filter((costume: any) => costume.category === 'A'));
        break;
      default:
        break;
    }
  };  

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditable) {
      setText(event.target.value);
    }
  };

  const handleBackgroundChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      setBackground(event.target.value);
    }
  };

  const handleBackgroundColorChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (isEditable) {
      setBackgroundColor(event.target.value);
    }
  };

  const handleTextColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      setTextColor(event.target.value);
    }
  };

  const handleTextDragStart = (event: MouseEvent<HTMLDivElement>) => {
    if (isEditable) {
      setIsDragging(true);
      event.preventDefault();
    }
  };

  const handleTextDragEnd = () => {
    if (isEditable) {
      setIsDragging(false);
    }
  };

  const handleTextDrag = (event: MouseEvent<HTMLDivElement>) => {
    if (isDragging && isEditable) {
      const { movementX, movementY } = event;
      setTextPosition((prevPosition) => ({
        x: Math.min(
          Math.max(prevPosition.x + movementX, 0),
          600 - (textSize * text.length) / 2
        ),
        y: Math.min(Math.max(prevPosition.y + movementY, 0), 400 - textSize),
      }));
    }
  };

  const handleTextResizeStart = (event: MouseEvent<HTMLDivElement>) => {
    if (isEditable) {
      setIsResizing(true);
      event.preventDefault();
    }
  };

  const handleTextResizeEnd = () => {
    if (isEditable) {
      setIsResizing(false);
    }
  };

  const handleTextResize = (event: MouseEvent<HTMLDivElement>) => {
    if (isResizing && isEditable) {
      const { movementY } = event;
      setTextSize((prevSize) => Math.max(8, prevSize + movementY / 2));
    }
  };

  const handleTextClick = () => {
    if (isEditable) {
      setIsTextEditing(true);
    }
  };

  const handleTextBlur = () => {
    if (isEditable) {
      setIsTextEditing(false);
    }
  };

  const handleMouseEnter = () => {
    if (isEditable) {
      setShowResizeHandle(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isResizing) {
      setShowResizeHandle(false);
    }
  };

  const handleSave = () => {
    const userConfirmed = window.confirm(
      "После сохранения ничего изменять нельзя будет. Вы уверены, что хотите сохранить?"
    );
    if (userConfirmed) {
      setIsEditable(false);
      // Implement save logic here
    }
  };

  const handleCanvasClick = () => {
    if (isTextEditing && isEditable) {
      setIsTextEditing(false);
    }
  };

  return (
    <>
      <div className="options-bar">
        <h2>{`Визуальная карточка аккаунта ${account?.gameAccount}`}</h2>
        <hr />
        <div className="all-options">
          <div className="option">
            <label>Заливка фона:</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
              disabled={!isEditable}
            />
          </div>
          <div className="option" id="option-bg">
            <label>Ссылка на фоновое изображение (не обязательно):</label>
            <input
              type="text"
              value={background}
              id="inp"
              onChange={handleBackgroundChange}
              disabled={!isEditable}
            />
          </div>
          <div className="option">
            <button onClick={handleAddText} disabled={!isEditable}>
              Добавить текст
            </button>
          </div>
          <div className="option">
            <label>Цвет текста:</label>
            <input
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
              disabled={!isEditable}
            />
          </div>
        </div>
        <button onClick={handleSave} disabled={!isEditable}>
          Сохранить
        </button>
      </div>
      <div className="editor-container2">
        <div className="costumes-editor">
          <h3>Костюмы SS</h3>
          <h3>Костюмы S</h3>
          <h3>Костюмы A</h3>
          <h3>Аксессуары</h3>
        </div>
        <div
          className="canvas"
          style={{
            backgroundColor,
            width: "600px",
            height: "400px",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={handleCanvasClick}
        >
          {background && (
            <img
              src={background}
              alt="Background"
              className="canvas-background"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
          <div
            className="text-box"
            style={{
              left: `${textPosition.x}px`,
              top: `${textPosition.y}px`,
              position: "absolute",
              fontSize: `${textSize}px`,
              color: textColor,
              cursor: isEditable ? "move" : "default",
            }}
            draggable={isEditable}
            onDragStart={handleTextDragStart}
            onDragEnd={handleTextDragEnd}
            onDrag={handleTextDrag}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleTextClick}
            onBlur={handleTextBlur}
          >
            {isEditable && showResizeHandle && (
              <div
                className="resize-handle"
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "blue",
                  right: 0,
                  bottom: 0,
                  cursor: "nwse-resize",
                }}
                draggable={true}
                onDragStart={handleTextResizeStart}
                onDragEnd={handleTextResizeEnd}
                onDrag={handleTextResize}
              />
            )}
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
