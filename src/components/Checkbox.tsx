import React, { useState, useEffect } from "react";
import checkmark from "../img/chech-mark.png";

const CheckAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={styles.container}>
      <img
        src={checkmark}
        alt="Checkmark"
        style={{ ...styles.checkmark, opacity: isVisible ? 1 : 0 }}
        className="checkmark__image"
      />
    </div>
  );
};

export default CheckAnimation;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    backgroundColor: "transparent",
  },
  checkmark: {
    width: "50px",
    height: "auto",
    transition: "opacity 1s ease",
  },
};
