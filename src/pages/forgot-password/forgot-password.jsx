import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./forgot-password.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import api from "../../utils/api";

import { useForm } from "../../hooks/useForm";
import { RESET_PASSWORD } from "../../utils/constants";

function ForgotPassword() {
  // const inputRef = useRef(null);

  const navigate = useNavigate();

  const { values, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    handlePasswordForgot();
  }

  function handlePasswordForgot() {
    api.passwordForgot(values).then((res) => {
      if (res) {
        localStorage.setItem("confirmationPasswordReset", res.success);
        navigate(RESET_PASSWORD, { replace: true });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.inputs_container}>
      <h2 className={"text text_type_main-medium mb-6"}>
        Восстановление пароля
      </h2>
      <div className={styles.inputs}>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Восстановить
      </Button>
      <div className={`${styles.inputs_text_container} mb-4`}>
        <p className={`${styles.inputs_text} text text_type_main-default`}>
          Вспомнили пароль?
        </p>
        <Link
          to="/login"
          className={`${styles.inputs_link} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </form>
  );
}

export default ForgotPassword;
