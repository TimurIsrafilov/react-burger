import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

function ModalOverlay(props) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        props.handleOnClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <section
      className={styles.modal_overlay}
      onClick={props.handleOnClose}
    ></section>
  );
}

ModalOverlay.propTypes = {
  handleOnClose: PropTypes.func,
};

export default ModalOverlay;
