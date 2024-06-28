import React, { useState, MouseEvent, ChangeEvent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../img/logo.png";
import userIcon from "../img/user-image.jpg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getOneAccount } from "../store/actions/account.action";
import axios from "axios";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { account } = useAppSelector((state) => state.accounts);
  const { id } = useParams();
  console.log(id);

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

  const handleBackgroundColorChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleSave = async () => {
    const userConfirmed = window.confirm(
      "После сохранения ничего изменять нельзя будет. Вы уверены, что хотите сохранить?"
    );
    if (userConfirmed) {
      setIsEditable(false); // Блокировать дальнейшее редактирование

      try {
        // Создаем временный элемент для сохранения содержимого
        const tempElement = document.createElement("div");
        tempElement.style.backgroundColor = backgroundColor;
        tempElement.style.width = "600px";
        tempElement.style.height = "400px";
        tempElement.style.position = "relative";

        if (background) {
          const backgroundImage = new Image();
          backgroundImage.src = background;
          backgroundImage.style.width = "100%";
          backgroundImage.style.height = "100%";
          backgroundImage.style.objectFit = "cover";
          backgroundImage.style.position = "absolute";
          backgroundImage.style.top = "0";
          backgroundImage.style.left = "0";
          tempElement.appendChild(backgroundImage);
        }

        const textElement = document.createElement("div");
        textElement.innerText = text;
        textElement.style.left = `${textPosition.x}px`;
        textElement.style.top = `${textPosition.y}px`;
        textElement.style.position = "absolute";
        textElement.style.fontSize = `${textSize}px`;
        textElement.style.color = textColor;
        tempElement.appendChild(textElement);

        const dataUrl = await elementToDataURL(tempElement);

        const response = await axios.post("http://localhost:8000/cards", {
          imageUrl: dataUrl,
          id,
        });
        return response.data;

        setImageUrl(dataUrl);
        alert("Изображение сохранено!");
      } catch (error) {
        console.error("Ошибка при сохранении изображения:", error);
        alert("Произошла ошибка при сохранении изображения.");
      }
    }
  };

  const handleCanvasClick = () => {
    if (isTextEditing && isEditable) {
      setIsTextEditing(false);
    }
  };

  // Функция для преобразования содержимого элемента в Data URL
  const elementToDataURL = (element: HTMLElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Создаем временный элемент для хранения содержимого
      const tempElement = document.createElement("div");
      tempElement.appendChild(element.cloneNode(true));

      // Создаем временный блок для вставки элемента и извлечения изображения
      const tempBlock = document.createElement("div");
      tempBlock.style.position = "absolute";
      tempBlock.style.left = "-99999px";
      tempBlock.style.width = "1px";
      tempBlock.style.height = "1px";
      tempBlock.style.overflow = "hidden";
      tempBlock.appendChild(tempElement);
      document.body.appendChild(tempBlock);

      // Функция для удаления временного блока
      const cleanup = () => {
        document.body.removeChild(tempBlock);
      };

      // Преобразуем содержимое в Data URL
      const exportImage = () => {
        const imageElement = tempElement.querySelector("img, canvas");
        if (imageElement instanceof HTMLCanvasElement) {
          resolve(imageElement.toDataURL("image/png"));
        } else if (imageElement instanceof HTMLImageElement) {
          const canvas = document.createElement("canvas");
          canvas.width = imageElement.width;
          canvas.height = imageElement.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(imageElement, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          } else {
            reject("Ошибка при создании контекста Canvas");
          }
        } else {
          reject("Невозможно извлечь изображение из элемента");
        }
      };

      // Ждем загрузки изображения перед экспортом
      const waitForImageLoad = () => {
        const imageElement = tempElement.querySelector("img, canvas");
        if (
          imageElement instanceof HTMLImageElement ||
          imageElement instanceof HTMLCanvasElement
        ) {
          imageElement.onerror = (error) => {
            reject("Ошибка загрузки изображения");
            cleanup();
          };
        }
        reject("Элемент не содержит изображения");
      };
    });
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
