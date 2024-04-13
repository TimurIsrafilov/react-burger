import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./register.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { createUser } from "../../services/user/actions";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../hooks/hooks";

type TypeUseForm = {
  name: string;
  email: string;
  password?: string;
};

function Register(): React.JSX.Element {
  // const inputRef = useRef(null);

  const { values, handleChange } = useForm<TypeUseForm>({
    name: "",
    email: "",
    password: "",
  });

  const [isInputTypePassword, setIsInputTypePassword] = useState(true);

  const dispatch = useAppDispatch();

  function onPasswordIconClick() {
    setIsInputTypePassword(!isInputTypePassword);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createUser(values));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.inputs_container}>
      <h2 className={`${styles.inputs_title} text text_type_main-medium mb-6`}>
        Регистрация
      </h2>
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name || ""}
          name={"name"}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
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
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Зарегистрироваться
      </Button>
      <div className={`${styles.inputs_text_container} mb-4`}>
        <p className={`${styles.inputs_text} text text_type_main-default`}>
          Уже зарегистрированы?
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

export default Register;
