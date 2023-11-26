import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/auth.module.scss";
import { AuthData } from "../App";
import { Button } from "../components/Button";
import { LoginForm } from "../components/LoginForm";
import { RegistrationForm } from "../components/RegistrationForm";

export const Auth = () => {
  const { LogIn, SignUp, user } = AuthData();
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(false);

  const [userName, setUserName] = useState({
    label: "Username",
    value: "",
  });
  const [email, setEmail] = useState({
    label: "Email",
    value: "",
  });
  const [password, setPassword] = useState({
    label: "Password",
    value: "",
  });

  const handleClick = async () => {
    if (email?.value && password?.value) {
      if (title(isLoginPage) === "Login") {
        const respons = await LogIn({
          email: email?.value,
          password: password?.value,
        });
        if (respons?.user?.role === "administrator") {
          return navigate("/admin-page");
        }
        else {
          return navigate("/employee-page");
        }
      } else {
        if (userName?.value) {
          const respons = await SignUp({
            userName: userName?.value,
            email: email?.value,
            password: password?.value,
          });
          if (respons?.email) {
            setIsLoginPage(!isLoginPage);
          }
        }
      }
    } else {
      alert("Please complete all fields");
    }
  };

  const onChangeUserName = (value) => {
    setUserName({ ...userName, value: value });
  };

  const onChangeEmail = (value) => {
    setEmail({ ...email, value: value });
  };

  const onChangeuserPassword = (value) => {
    setPassword({ ...password, value: value });
  };

  const title = useCallback((page) => (page ? "Login" : "Registration"), []);

  const onChangePage = useCallback(() => {
    setIsLoginPage(!isLoginPage);
    onChangeUserName("");
    onChangeEmail("");
    onChangeuserPassword("");
  }, [isLoginPage]);


  useEffect(() => {
    if (user && user?.role === 'employee') {
      navigate("/employee-page")
    }
    else if (user && user?.role === 'administrator') {
      navigate("/admin-page")
    }
  }, [user]);

  return (
    <div className={styles.container_fluid}>
      <div className={styles.card}>
        <h1 className={styles.title}>{title(isLoginPage)} Page</h1>
        <div className={styles.form}>
          {isLoginPage ? (
            <LoginForm
              onChangeEmail={onChangeEmail}
              email={email}
              onChangeuserPassword={onChangeuserPassword}
              password={password}
            />
          ) : (
            <RegistrationForm
              onChangeUserName={onChangeUserName}
              userName={userName}
              onChangeuserPassword={onChangeuserPassword}
              password={password}
              onChangeEmail={onChangeEmail}
              email={email}
            />
          )}
          <Button label={title(isLoginPage)} onclick={handleClick} />
        </div>
        <div className={styles.text} onClick={onChangePage}>
          go to {title(!isLoginPage)} Page
        </div>
      </div>
    </div>
  );
};
