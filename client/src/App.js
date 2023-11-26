import React, { createContext, useContext, useState } from "react";
import { Sign_In, Sign_Up, Log_Out } from "./service/AuthService";
import { Router } from "./Router/Router";
import { getMe } from "./service/UserService";

export const AuthData = () => useContext(AuthContext);
const AuthContext = createContext();

export function App() {
  const [render, setRender] = useState(1)
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    isAuth: false,
  });

  const LogIn = async (user) => {
    const { data } = await Sign_In(user);
    if (data?.data?.accessToken) {
      const { email, username, role } = data?.data?.user;
      setUser({
        name: username,
        email: email,
        role: role,
        isAuth: true,
      });
      localStorage.setItem("token", JSON.stringify(data?.data?.accessToken));
      setRender(render + 1)
      return data?.data;
    } else {
      alert("something went wrong");
    }
  };

  const SignUp = async (user) => {
    const { data } = await Sign_Up(user);
    if (data?.data?.user) {
      return data?.data.user;
    } else {
      alert("something went wrong");
    }
  };

  const LogOut = async () => {
    await Log_Out()
    localStorage.removeItem('token')
    setRender(render + 1)
    setUser({
      name: '',
      email: '',
      isAuth: false,
    });
  };

  const getCurentUser = async () => {
    const { data } = await getMe();
    if (data?.data?.email) {
      setUser({
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        isAuth: true,
      });
      return data.data;
    }
    else {
      setUser({
        name: '',
        email: '',
        isAuth: false,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, LogIn, SignUp, LogOut, getCurentUser, render }}
    >
      <Router />
    </AuthContext.Provider>
  );
}