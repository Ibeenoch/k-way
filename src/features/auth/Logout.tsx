import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./authSlice";
import { useDispatch } from "react-redux";
import { logoutTransactions } from "../checkout/checkoutSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("otheruser");
    localStorage.removeItem("alluser");
    dispatch(logout());
    dispatch(logoutTransactions());
    navigate("/login");
  });
  return <div>You are being Signed out now...</div>;
};

export default Logout;
