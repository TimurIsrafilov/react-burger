import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./reset-password.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import api from "../../utils/api";

function ResetPassword() {
  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const [isInputTypePassword, setIsInputTypePassword] = useState(true);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function onPasswordIconClick() {
    setIsInputTypePassword(!isInputTypePassword);
  }

  function onSubmit(e) {
    e.preventDefault();
    api.passwordReset(values).then((res) => {
      if (res) {
        localStorage.removeItem("confirmationPasswordReset");
        navigate("/login", { replace: true });
      }
    });
  }

  const inputRef = useRef(null);

  return (
    <div className={styles.inputs_container}>
      <h2 className={`${styles.inputs_title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h2>

      <Input
        type={isInputTypePassword ? "password" : "text"}
        placeholder={"Введите новый пароль"}
        onChange={onChange}
        icon={"ShowIcon"}
        value={values.password || ""}
        name={"password"}
        error={false}
        ref={inputRef}
        onIconClick={onPasswordIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={values.code || ""}
          name={"code"}
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
        Сохранить
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

export default ResetPassword;
