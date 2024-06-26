import React, { useState, MouseEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import userIcon from "../img/user-image.jpg";

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

  const handleAddText = () => {
    setIsTextEditing(true);
  };

  const handleCanvasClick = () => {
    if (isTextEditing) {
      setIsTextEditing(false);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleBackgroundChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBackground(event.target.value);
  };

  const handleBackgroundColorChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundColor(event.target.value);
  };

  const handleTextColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextColor(event.target.value);
  };

  const handleTextDragStart = (event: MouseEvent<HTMLDivElement>) => {
    if (event.detail === 2) {
      setIsDragging(true);
      event.preventDefault();
    }
  };

  const handleTextDragEnd = () => {
    setIsDragging(false);
  };

  const handleTextDrag = (event: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const { movementX, movementY } = event;
      setTextPosition((prevPosition) => {
        const newX = Math.min(
          Math.max(prevPosition.x + movementX, 0),
          600 - (textSize * text.length) / 2
        );
        const newY = Math.min(
          Math.max(prevPosition.y + movementY, 0),
          400 - textSize
        );
        return { x: newX, y: newY };
      });
    }
  };

  const handleTextResizeStart = (event: MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
    event.preventDefault();
  };

  const handleTextResizeEnd = () => {
    setIsResizing(false);
  };

  const handleTextResize = (event: MouseEvent<HTMLDivElement>) => {
    if (isResizing) {
      const { movementY } = event;
      setTextSize((prevSize) => Math.max(8, prevSize + movementY / 2));
    }
  };

  const handleTextClick = () => {
    setIsTextEditing(true);
  };

  const handleTextBlur = () => {
    setIsTextEditing(false);
  };

  const handleMouseEnter = () => {
    setShowResizeHandle(true);
  };

  const handleMouseLeave = () => {
    if (!isResizing) {
      setShowResizeHandle(false);
    }
  };

  const id = localStorage.getItem("currentUser");

  return (
    <>
      <div className="options-bar">
        <h2>Визуальная карточка вашего аккаунта</h2>
        <hr />
        <div className="all-options">
          <div className="option">
            <label>Заливка фона:</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
            />
          </div>
          <div className="option" id="option-bg">
            <label>Ссылка на фоновое изображение(не обязательно):</label>
            <input
              type="text"
              value={background}
              id="inp"
              onChange={handleBackgroundChange}
            />
          </div>
          <div className="option">
            <button onClick={handleAddText}>Добавить текст</button>
          </div>
          <div className="option">
            <label>Цвет текста:</label>
            <input
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
            />
          </div>
        </div>
      </div>
      <div className="editor-container2">
        <div className="costumes-editor">
          <h3>Костюмы SS</h3>
          <h3>Костюмы S</h3>
          <h3>Костюмы A</h3>
          <h3>Акссессуары</h3>
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
          {isTextEditing ? (
            <textarea
              className="text-input"
              value={text}
              onChange={handleTextChange}
              style={{
                left: textPosition.x,
                top: textPosition.y,
                position: "absolute",
                zIndex: 10,
                fontSize: `${textSize}px`,
                color: textColor,
                resize: "none",
              }}
              rows={1}
              onBlur={handleTextBlur}
              autoFocus
            />
          ) : (
            <div
              className="text-box"
              style={{
                left: textPosition.x,
                top: textPosition.y,
                cursor: isDragging ? "grabbing" : "grab",
                fontSize: `${textSize}px`,
                color: textColor,
                position: "absolute",
                zIndex: 10,
                maxWidth: "600px",
              }}
              onMouseDown={handleTextDragStart}
              onMouseUp={handleTextDragEnd}
              onDoubleClick={handleTextDragStart}
              onMouseMove={handleTextDrag}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleTextClick}
            >
              <div className="text-content">{text}</div>
              {showResizeHandle && (
                <div
                  className="resize-handle"
                  onMouseDown={handleTextResizeStart}
                  onMouseUp={handleTextResizeEnd}
                  onMouseMove={handleTextResize}
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "blue",
                    position: "absolute",
                    bottom: "-5px",
                    right: "-5px",
                    cursor: "se-resize",
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;
