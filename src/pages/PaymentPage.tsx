import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    alert("Нажмите оплатить и скачайте вашу визуальную карточку аккаунта!")
  })
  const id = localStorage.getItem("currentUser")?.replace(/"/g, "");

  return (
    <div>
      <button
        style={{
          margin: "350px auto auto 600px",
          height: "100px",
          width: "300px",
          fontSize: "30px",
          backgroundColor: "lightblue",
          cursor: "pointer",
        }}
        onClick={() => {navigate(`/${id}/profile`)}}
      >
        ОПЛАТИТЬ
      </button>
    </div>
  );
};

export default PaymentPage;
