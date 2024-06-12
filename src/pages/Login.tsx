import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import CheckAnimation from "../components/Checkbox";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isChecked, setIsChecked] = useState(false);
  const [showCheckAnimation, setShowCheckAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = { email: email === "", password: password === "" };

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      setErrorMessage("Неверный email или пароль");
    } else {
      // Simulate authentication logic here
      setErrors({ email: false, password: false });
      setErrorMessage("");
      // Navigate to the desired page or handle successful login
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowCheckAnimation(true);

    setTimeout(() => {
      setShowCheckAnimation(false);
    }, 2000);
  };

  return (
    <div className="auth">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img src={logo} alt="logo" className="logo" />
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Войти</h2>
            <input
              type="email"
              className="auth__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: errors.email ? "red" : "#c6c6c6" }}
            />
            <input
              type="password"
              className="auth__input"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: errors.password ? "red" : "#c6c6c6" }}
            />
            <Link to="/forgot" className="auth__forgot-password">
              Забыли пароль?
            </Link>
            <div className="auth-checkbox">
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="checkbox">Я не робот</label>
                {showCheckAnimation && <CheckAnimation />}
              </div>
            </div>
            <button type="submit" className="auth-btn">
              Войти
            </button>
            {errorMessage && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errorMessage}
              </span>
            )}
            <p>Еще не зарегистрированы?</p>
            <Link to="/user/registration/" style={{ marginTop: "-20px" }}>
              Зарегистрироваться
            </Link>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
