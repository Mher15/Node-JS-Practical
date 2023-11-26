import React, { Fragment, memo } from "react";
import { Input } from "./Input";

export const RegistrationForm = memo(
  ({
    onChangeUserName,
    userName,
    onChangeuserPassword,
    password,
    onChangeEmail,
    email,
  }) => {
    return (
      <Fragment>
        <Input
          type={"text"}
          onChange={onChangeUserName}
          value={userName.value}
          placeholder={userName.label}
          inputName={userName.label}
        />
        <Input
          type={"password"}
          onChange={onChangeuserPassword}
          value={password.value}
          placeholder={password.label}
          inputName={password.label}
        />
        <Input
          type={"email"}
          onChange={onChangeEmail}
          value={email.value}
          placeholder={email.label}
          inputName={email.label}
        />
      </Fragment>
    );
  }
);
