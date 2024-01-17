import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./profile.module.css";

import { logoutUser } from "../../services/user/actions";
import { ORDERS, PROFILE } from "../../utils/constants";

function Profile(): React.JSX.Element {
  const dispatch = useDispatch();

  function handleOnClick() {
    //@ts-ignore
    dispatch(logoutUser());
  }

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_menu_container}>
        <div className={`${styles.items_container} mr-20`}>
          <NavLink
            to={PROFILE}
            className={({ isActive }) =>
              isActive
                ? `${styles.item_link_active} text text_type_main-medium`
                : `${styles.item_link} text text_type_main-medium`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={ORDERS}
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
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
