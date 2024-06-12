import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import logo from "../img/logo.png";
import CheckAnimation from "../components/Checkbox";
import Loader from "../components/Loader";
import { RegisterType } from "../types";
import { Register } from "../store/actions/user.action";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordRepeat: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showCheckAnimation, setShowCheckAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "nickname":
        setNickname(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordRepeat":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      email: email === "",
      nickname: nickname === "",
      password: password === "",
      passwordRepeat: passwordRepeat === "",
    };

    setErrors(validationErrors);

    if (password !== passwordRepeat) {
      validationErrors.password = true;
      validationErrors.passwordRepeat = true;
      setErrorMessage("Пароли не совпадают");
    } else if (Object.values(validationErrors).some((error) => error)) {
      setErrorMessage("Заполните все поля");
    } else {
      setErrorMessage("");

      const userData: RegisterType = {
        email,
        nickname,
        password,
        passwordRepeat,
      };

      dispatch(Register({ data: userData }));
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
    <div className="auth" style={{ marginTop: "-60px" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img src={logo} alt="logo" className="logo" />
          <form
            className="auth-form"
            onSubmit={handleSubmit}
            style={{ marginTop: "-20px" }}
          >
            <h2>Регистрация</h2>
            <input
              type="email"
              className="auth__input"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              style={{ borderColor: errors.email ? "red" : "#c6c6c6" }}
            />
            <input
              type="text"
              className="auth__input"
              placeholder="Никнэйм"
              name="nickname"
              value={nickname}
              onChange={handleChange}
              style={{ borderColor: errors.nickname ? "red" : "#c6c6c6" }}
            />
            <input
              type="password"
              className="auth__input"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={handleChange}
              style={{ borderColor: errors.password ? "red" : "#c6c6c6" }}
            />
            <input
              type="password"
              className="auth__input"
              placeholder="Повторный пароль"
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={handleChange}
              style={{
                borderColor: errors.passwordRepeat ? "red" : "#c6c6c6",
              }}
            />

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

            <div className="auth-checkbox">
              <div>
                <input
                  type="checkbox"
                  id="checkbox-agreement"
                  checked={isChecked}
                  style={{ marginLeft: "143px" }}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="checkbox-agreement">
                  Я принимаю условия <br />
                  <a href="#" style={{ fontSize: "16px", marginLeft: "143px" }}>
                    пользовательского соглашения
                  </a>
                </label>
              </div>
            </div>

            <button type="submit" className="auth-btn">
              Зарегистрироваться
            </button>
            {errorMessage && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errorMessage}
              </span>
            )}
            <p>Уже зарегистрированы?</p>
            <Link to="/" style={{ marginTop: "-20px" }}>
              Войти
            </Link>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterComponent;
