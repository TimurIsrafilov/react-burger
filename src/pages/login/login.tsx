import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./login.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUser } from "../../services/user/actions";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../hooks/hooks";

type TypeUseForm = {
  email: string;
  password: string;
};

function Login(): React.JSX.Element {
  // const inputRef = useRef(null);

  const { values, handleChange } = useForm<TypeUseForm>({
    email: "",
    password: "",
  });

  const [isInputTypePassword, setIsInputTypePassword] = useState(true);

  const dispatch = useAppDispatch();

  function onPasswordIconClick(): void {
    setIsInputTypePassword(!isInputTypePassword);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginUser(values));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.inputs_container}>
      <h2 className={`${styles.inputs_title} text text_type_main-medium mb-6`}>
        Вход
      </h2>
      <div className={styles.inputs}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          data-testid="email_input"
        />
        <Input
          type={isInputTypePassword ? "password" : "text"}
          placeholder={"Пароль"}
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
          data-testid="password_input"
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
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
