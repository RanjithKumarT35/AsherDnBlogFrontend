import React from "react";
//import { useState } from "react";
import { Outlet } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import Login from "./LoginPage";
//import API_URL from "../global";

const AuthUser = () => {
  //const Navigate = useNavigate();
  const email = localStorage.getItem("EmailInput");
  const password = localStorage.getItem("PasswordInput");

  if (email === "asherdnblogs2024@gmail.com" && password === "1234") {
    const user = { login: true };
    return user && user.login;
    // Navigate(`${API_URL}/CreatePost`);
  } else {
    const user = { login: false };
    return user && user.login;
  }
};

const Protect = () => {
  const isAuth = AuthUser();
  return isAuth ? <Outlet /> : <Login />;
};

export default Protect;
