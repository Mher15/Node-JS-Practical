import React, { Fragment, memo } from "react";
import { Input } from "./Input";

export const LoginForm = memo(
  ({ onChangeEmail, email, onChangeuserPassword, password }) => {
    return (
      <Fragment>
        <Input
          type={"text"}
          onChange={onChangeEmail}
          value={email.value}
          placeholder={email.label}
          inputName={email.label}
        />
        <Input
          type={"password"}
          onChange={onChangeuserPassword}
          value={password.value}
          placeholder={password.label}
          inputName={password.label}
        />
      </Fragment>
    );
  }
);