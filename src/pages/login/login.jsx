import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./login.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUser } from "../../services/user/actions";

function Login() {
  const [values, setValues] = useState({});
  const [isInputTypePassword, setIsInputTypePassword] = useState(true);

  const dispatch = useDispatch();

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function onPasswordIconClick() {
    setIsInputTypePassword(!isInputTypePassword);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(values));
  }

  const inputRef = useRef(null);

  return (
    <form className={styles.inputs_container}>
      <h2 className={`${styles.inputs_title} text text_type_main-medium mb-6`}>
        Вход
      </h2>
      <div className={styles.inputs}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
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
        <Input
          type={isInputTypePassword ? "password" : "text"}
          placeholder={"Пароль"}
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
      </div>
      <Button
        htmlType="button"
        type="primary"
        onClick={onSubmit}
        size="medium"
        extraClass="mb-20"
      >
        Войти
      </Button>
      <div className={`${styles.inputs_text_container} mb-4`}>
        <p className={`${styles.inputs_text} text text_type_main-default`}>
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={`${styles.inputs_link} text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.inputs_text_container}>
        <p className={`${styles.inputs_text} text text_type_main-default`}>
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={`${styles.inputs_link} text text_type_main-default`}
        >
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
}

export default Login;
