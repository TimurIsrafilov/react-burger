import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./profile-information.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileInformation() {
  const userStore = useSelector((store) => store.user.user);
  const userData = userStore ? userStore : {};

  const [values, setValues] = useState(userData);
  const [isInputTypePassword, setIsInputTypePassword] = useState(true);
  const [isInputChanged, setisInputChanged] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setisInputChanged(true);
  };

  function onPasswordIconClick() {
    setIsInputTypePassword(!isInputTypePassword);
  }

  const inputRef = useRef(null);

  return (
    <form className={styles.inputs}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        icon={"EditIcon"}
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
        placeholder={"Логин"}
        onChange={onChange}
        icon={"EditIcon"}
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
        // icon={"EditIcon"}
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

      <div className={styles.inputs_button_container}>
        {isInputChanged && (
          <div>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              // extraClass="mb-20"
            >
              Отменить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              // extraClass="mb-20"
            >
              Сохранить
            </Button>{" "}
          </div>
        )}
      </div>
    </form>
  );
}

export default ProfileInformation;
