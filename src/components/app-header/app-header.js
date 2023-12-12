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
          <div className={`${styles.item} mt-5 mr-5 mb-5 ml-5`}>
            <BurgerIcon type="prymary" />
            <p className="text text__type_main-default ml-2">Конструктор</p>
          </div>
          <div className={`${styles.item} mt-5 mr-5 mb-5 ml-5`}>
            <ListIcon type="secondary" />
            <p className="text text__type_main-default ml-2">Лента заказов</p>
          </div>
        </div>
        <Logo />
        <div className={`${styles.item} mt-5 mr-5 mb-5 ml-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text__type_main-default ml-2">Личный кабинет</p>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
