import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import IsRegistered from "../pages/IsRegistered";
import ForgotPassword from "../pages/ForgotPassword";
import ResultPassword from "../pages/ResultPassword";
import UserProfile from "../pages/UserProfile";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/isregistered" element={<IsRegistered />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/result" element={<ResultPassword />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

export default MainRoutes;
