import React from "react";

const Loader = () => {
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .loading {
            display: inline-block;
            width: 100px; /* Increased size */
            height: 100px; /* Increased size */
            position: relative;
          }

          .arrow {
            position: absolute;
            width: 20px; /* Increased size */
            height: 20px; /* Increased size */
            background-color: #B5A1F8;
            transform-origin: 50px 50px; /* Adjusted for new size */
            animation: spin 1s linear infinite;
          }

          .arrow1 { transform: rotate(0deg) translate(50px); }  /* Adjusted for new size */
          .arrow2 { transform: rotate(90deg) translate(50px); }  /* Adjusted for new size */
          .arrow3 { transform: rotate(180deg) translate(50px); }  /* Adjusted for new size */
          .arrow4 { transform: rotate(270deg) translate(50px); }  /* Adjusted for new size */
        `}
      </style>
      <div className="loading">
        <div className="arrow arrow1"></div>
        <div className="arrow arrow2"></div>
        <div className="arrow arrow3"></div>
        <div className="arrow arrow4"></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
  },
};

export default Loader;
