import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./reset-password.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import api from "../../utils/api";

import { useForm } from "../../hooks/useForm";
import { LOGIN } from "../../utils/constants";

type TypeUseForm = {
  password: string;
  code: string;
};

function ResetPassword(): React.JSX.Element {
  // const inputRef = useRef(null);

  const navigate = useNavigate();

  const [isInputTypePassword, setIsInputTypePassword] = useState(true);

  const { values, handleChange } = useForm<TypeUseForm>({
    password: "",
    code: "",
  });

  function onPasswordIconClick() {
    setIsInputTypePassword(!isInputTypePassword);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api.passwordReset(values).then((res) => {
      if (res) {
        localStorage.removeItem("confirmationPasswordReset");
        navigate(LOGIN, { replace: true });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.inputs_container}>
      <h2 className={`${styles.inputs_title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h2>
      <Input
        type={isInputTypePassword ? "password" : "text"}
        placeholder={"Введите новый пароль"}
        onChange={handleChange}
        icon={"ShowIcon"}
        value={values.password || ""}
        name={"password"}
        error={false}
        // ref={inputRef}
        onIconClick={onPasswordIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          value={values.code || ""}
          name={"code"}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
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
    </form>
  );
}

export default ResetPassword;
