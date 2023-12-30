import { NavLink } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.navbar} mt-4 mb-4`}>
        <div className={styles.menu}>
          <NavLink to="/" className={`${styles.menu_item} mt-5 mr-5 mb-5 ml-5`}>
            {({ isActive }) =>
              isActive ? (
                <div className={`${styles.menu_item} mr-5`}>
                  <BurgerIcon type="primary" />
                  <p
                    className={`${styles.text} text text_type_main-default ml-2`}
                  >
                    Конструктор{" "}
                  </p>
                </div>
              ) : (
                <div className={`${styles.menu_item} mr-5`}>
                  <BurgerIcon type="secondary" />
                  <p
                    className={
                      "text text_type_main-default text_color_inactive ml-2"
                    }
                  >
                    Конструктор{" "}
                  </p>
                </div>
              )
            }
          </NavLink>

          <NavLink to="/orders-history" className={`${styles.menu_item} mr-5`}>
            {({ isActive }) =>
              isActive ? (
                <div className={`${styles.menu_item} mr-5`}>
                  <ListIcon type="primary" />
                  <p
                    className={`${styles.text} text text_type_main-default ml-2`}
                  >
                    Лента заказов
                  </p>
                </div>
              ) : (
                <div className={`${styles.menu_item} mr-5`}>
                  <ListIcon type="secondary" />
                  <p
                    className={
                      "text text_type_main-default text_color_inactive ml-2"
                    }
                  >
                    Лента заказов
                  </p>
                </div>
              )
            }
          </NavLink>
        </div>

        <Logo />

        <NavLink to="/profile" className={`${styles.profile_item} mr-5`}>
          {({ isActive }) =>
            isActive ? (
              <div className={`${styles.profile_item} mr-5`}>
                <ProfileIcon type="primary" />
                <p
                  className={`${styles.text} text text_type_main-default ml-2`}
                >
                  Личный кабинет
                </p>
              </div>
            ) : (
              <div className={`${styles.profile_item} mr-5`}>
                <ProfileIcon type="secondary" />
                <p
                  className={
                    "text text_type_main-default text_color_inactive ml-2"
                  }
                >
                  Личный кабинет
                </p>
              </div>
            )
          }
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
