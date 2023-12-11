import { useEffect } from "react";

import { useDispatch } from "react-redux";

import styles from "./modal-overlay.module.css";

import { closeIngredient } from "../../services/ingredient/actions";
import { closeOrder } from "../../services/order/actions";

function ModalOverlay() {
  const dispatch = useDispatch();

  function handleOnClose() {
    dispatch(closeIngredient());
    dispatch(closeOrder());
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleOnClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <section className={styles.modal_overlay} onClick={handleOnClose}></section>
  );
}

export default ModalOverlay;
