import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

const portal = document.getElementById("portal");

const Modal = (props) =>
  ReactDOM.createPortal(
    <section className={styles.modal}>
      <ModalOverlay handleOnClose={props.handleOnClose} />
      <div className={styles.modal_container}>
        <div className={`${styles.modal_close_icon} mt-15 mr-10`}>
          <CloseIcon type="primary" onClick={props.handleOnClose} />
        </div>
        {props.children}
      </div>
    </section>,
    portal
  );

Modal.propTypes = {
  handleOnClose: PropTypes.func,
  ingredient: PropTypes.object,
};

export default Modal;
