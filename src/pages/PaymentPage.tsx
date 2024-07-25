import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import triangle from "../img/triangle.png";
import masterCard from "../img/masterCard.png";
import visa from "../img/visa.png";
import payPal from "../img/paypal.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getOneAccount } from "../store/actions/account.action";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");
  const accountId = localStorage.getItem("accountId");

  const { account } = useAppSelector((state) => state.accounts);
  useEffect(() => {
    getOneAccount(accountId!);
  }, [dispath]);

  return (
    <div className="auth-acc">
      <h1 className="pay-h1">Оплата</h1>
      <p style={{
        color: "gray",
        fontWeight: "500",
        fontSize: "17px"
      }} className="pay-p">Загрузка файла будет доступна после оплаты</p>
      <div className="blockk">
        <img src={triangle} alt="" />
        <p>После оплаты не будет возможности менять костюмы из содержания аккаунта</p>
      </div>
      <h3 className="pay-h3">
        Визуальная карточка аккаунта{" "}
        <span className="blue-text">{account?.gameAccount}</span> - 100р.
      </h3>
      <h2 className="pay-h2">Способ оплаты</h2>
      <div className="cards-pay">
        <li>
          <img src={masterCard} alt="" />
          <div className="div">
            <input type="radio" />
            <p>MasterCard</p>
          </div>
        </li>

        <li>
          <img src={visa} alt="" />
          <div className="div">
            <input type="radio" />
            <p>Visa</p>
          </div>
        </li>

        <li>
          <img src={payPal} alt="" />
          <div className="div">
            <input type="radio" />
            <p>PayPal</p>
          </div>
        </li>
      </div>
    </div>
  );
};

export default PaymentPage;
