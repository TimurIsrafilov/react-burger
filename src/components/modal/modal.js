import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { closeIngredient } from "../../services/ingredient/actions";
import { closeOrder } from "../../services/order/actions";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

const portal = document.getElementById("portal");

function Modal(props) {
  const dispatch = useDispatch();

  function handleOnClose() {
    dispatch(closeIngredient());
    dispatch(closeOrder());
  }

  return ReactDOM.createPortal(
    <section className={styles.modal}>
      <ModalOverlay />
      <div className={styles.modal_container}>
        <div className={`${styles.modal_close_icon} mt-15 mr-10`}>
          <CloseIcon type="primary" onClick={handleOnClose} />
        </div>
        {props.children}
      </div>
    </section>,
    portal
  );
}

Modal.propTypes = {
  handleOnClose: PropTypes.func,
  ingredient: PropTypes.object,
};

export default Modal;
