import { NavLink, Outlet } from "react-router-dom";

import styles from "./profile.module.css";

import { logoutUser } from "../../services/user/actions";
import { ORDERS, PROFILE } from "../../utils/constants";
import { useAppDispatch } from "../../hooks/hooks";

function Profile(): React.JSX.Element {
  const dispatch = useAppDispatch();

  function handleOnClick() {
    dispatch(logoutUser());
  }

  const currentUrl = window.location.pathname.split("/").pop();

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_menu_container}>
        <div className={`${styles.items_container} mr-20`}>
          <NavLink
            to={PROFILE}
            className={
              currentUrl === "profile"
                ? `${styles.item_link_active} text text_type_main-medium`
                : `${styles.item_link} text text_type_main-medium`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={`${PROFILE}${ORDERS}`}
            className={({ isActive }) =>
              isActive
                ? `${styles.item_link_active} text text_type_main-medium`
                : `${styles.item_link} text text_type_main-medium`
            }
          >
            История заказов
          </NavLink>

          <button onClick={handleOnClick} className={styles.item_button}>
            <p className={"text text_type_main-medium"}>Выход</p>
          </button>

          <p
            className={`${styles.item_text} text text_type_main-default text_color_inactive mt-20`}
          >
            {currentUrl === "profile"
              ? "В этом разделе вы можете изменить свои персональные данные"
              : "  В этом разделе вы можете просмотреть свою историю заказов"}
          </p>
        </div>
        <div className={styles.item_content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
