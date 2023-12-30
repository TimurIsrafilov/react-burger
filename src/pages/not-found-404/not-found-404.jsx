import styles from "./not-found-404.module.css";

function NotFound404() {
  return (
    <div className={styles.error}>
      <h2 className={`${styles.error_text} text text_type_main-medium mt-20`}>
        Cтраница не найдена{" "}
      </h2>
      <p className={`${styles.error_number} text text_type_digits-large mt-20`}>
        404
      </p>
    </div>
  );
}

export default NotFound404;
