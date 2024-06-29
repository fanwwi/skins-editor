import React, { useEffect, useState } from "react";
import rainbow from "../img/rainbow-ball.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getOneAccount,
  getUserAss,
  getUserCostumes,
} from "../store/actions/account.action";
import iconImage from "../img/image-icon.png"

const EditorPage = () => {
  const accountId = localStorage.getItem("currentAccount");
  const { userCostumes } = useAppSelector((state) => state.accounts);
  const { userAss } = useAppSelector((state) => state.accounts);
  const { account } = useAppSelector((state) => state.accounts);

  const [costumeS, setCostumeS] = useState(false);
  const [costumeSS, setCostumeSS] = useState(false);
  const [costumeA, setCostumeA] = useState(false);
  const [ass, setAss] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCostumes(accountId!));
    dispatch(getOneAccount(accountId!));
    dispatch(getUserAss(accountId!));
  }, [dispatch]);
  return (
    <div className="list">
      <div className="options">
        <div className="container">
          <div className="block-top">
            <h3 id="color">
              <img src={rainbow} alt="" /> Заливка
            </h3>
            <div className="label">
              Изображение для заливки
              <input type="text" />
            </div>
            <div className="font-size">
              <button>+</button>
              <div className="fz">default</div>
              <button>-</button>
            </div>

            <div className="canva-size">
              <span>Размер холста:</span>
              <div className="down-block">
                <button>+</button>
                <div className="fz">default</div>
                <button>-</button>
              </div>
            </div>

            <div className="label">
              <div className="top">Добавить изображение <img src={iconImage} alt="" /></div>
              <input type="text" />
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
        <div className="canva">
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
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
