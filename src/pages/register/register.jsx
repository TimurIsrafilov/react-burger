import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./register.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { createUser } from "../../services/user/actions";

function Register() {
  const [values, setValues] = useState({});
  const [isInputTypePassword, setIsInputTypePassword] = useState(true);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function onPasswordIconClick() {
    setIsInputTypePassword(!isInputTypePassword);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(createUser(values));
  }

  const inputRef = useRef(null);

  return (
    <div className={styles.inputs_container}>
      <h2 className={`${styles.inputs_title} text text_type_main-medium mb-6`}>
        Регистрация
      </h2>
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={values.name || ""}
          name={"name"}
          error={false}
          ref={inputRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
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
    </div>
  );
}

export default Register;
