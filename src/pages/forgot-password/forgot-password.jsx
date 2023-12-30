import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./forgot-password.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import api from "../../utils/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [values, setValues] = useState({});

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    handlePasswordForgot();
  }

  function handlePasswordForgot() {
    api.passwordForgot(values).then((res) => {
      if (res) {
        localStorage.setItem("confirmationPasswordReset", res.success);
        navigate("/reset-password", { replace: true });
      }
    });
  }

  const inputRef = useRef(null);

  return (
    <div className={styles.inputs_container}>
      <h2 className={"text text_type_main-medium mb-6"}>
        Восстановление пароля
      </h2>
      <div className={styles.inputs}>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={onChange}
          value={values.email || ""}
          name={"email"}
          error={false}
          ref={inputRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
      </div>
      <Button
        htmlType="button"
        type="primary"
        onClick={onSubmit}
        size="medium"
        extraClass="mb-20"
      >
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
    </div>
  );
}

export default ForgotPassword;
