import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./profile-information.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { updateUser } from "../../services/user/actions";
import { useForm } from "../../hooks/useForm";

type TypeUseForm = {
  name: string;
  email: string;
  password: string;
};

function ProfileInformation(): React.JSX.Element {
  // const inputRef = useRef(null);
  //@ts-ignore
  const userStore = useSelector((store) => store.user.user);
  const userData = userStore ? userStore : {};

  const dispatch = useDispatch();

  const [isInputTypePassword, setIsInputTypePassword] = useState(true);

  const { values, handleChange, isInputChanged, resetForm } =
    useForm<TypeUseForm>({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

  const onPasswordIconClick = () => {
    setIsInputTypePassword(!isInputTypePassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(updateUser(values));
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
              onClick={resetForm}
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
