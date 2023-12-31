import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./profile-information.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { updateUser } from "../../services/user/actions";

function ProfileInformation() {
  // const inputRef = useRef(null);

  const userStore = useSelector((store) => store.user.user);
  const userData = userStore ? userStore : {};

  const dispatch = useDispatch();

  const [values, setValues] = useState(userData);
  const [isInputTypePassword, setIsInputTypePassword] = useState(true);
  const [isInputChanged, setisInputChanged] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setisInputChanged(true);
  };

  function onPasswordIconClick() {
    setIsInputTypePassword(!isInputTypePassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(values));
  }

  function handleUndo() {
    setValues(userData);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.inputs}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        icon={"EditIcon"}
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
        placeholder={"Логин"}
        onChange={handleChange}
        icon={"EditIcon"}
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
        // icon={"EditIcon"}
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

      <div className={styles.inputs_button_container}>
        {isInputChanged && (
          <div>
            <Button
              htmlType="reset"
              type="secondary"
              size="medium"
              onClick={handleUndo}
              // extraClass="mb-20"
            >
              Отменить
            </Button>
            <Button
              htmlType="submit"
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
