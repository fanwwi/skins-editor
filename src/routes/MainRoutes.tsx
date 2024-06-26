import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import IsRegistered from "../pages/IsRegistered";
import ForgotPassword from "../pages/ForgotPassword";
import ResultPassword from "../pages/ResultPassword";
import UserProfile from "../pages/UserProfile";
import ErrorRegisterPage from "../pages/ErrorRegisterPage";
import ErrorLoginPage from "../pages/ErrorLoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AccountActivate from "../pages/AccountActivate";
import AddPage from "../pages/AddPage";
import Settings from "../pages/Settings";
import EditPage from "../pages/EditPage";
import Editor from "../pages/EditorPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/isregistered" element={<IsRegistered />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/result" element={<ResultPassword />} />
      <Route path="/:id/profile" element={<UserProfile />} />
      <Route path="/:id/settings" element={<Settings />} />
      <Route path="/error/login" element={<ErrorLoginPage />} />
      <Route path="/error/register" element={<ErrorRegisterPage />} />
      <Route path="/account/activate" element={<AccountActivate />} />
      <Route path="/add-page/add-account" element={<AddPage />} />
      <Route path="/edit/:accountId" element={<EditPage />} />
      <Route path="/editor/:id" element={<Editor />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRoutes;
