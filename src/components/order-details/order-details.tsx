import done from "../../images/done.svg";

import styles from "./order-details.module.css";

import { useAppSelector } from "../../hooks/hooks";
import { selectOrder } from "../../services/order/reducer";

function OrderDetails(): React.JSX.Element | null {
  const orderNumber = useAppSelector(selectOrder);

  if (!orderNumber) {
    return null;
  }

  return (
    <section className={styles.order_details_container}>
      <div className="text text_type_digits-large">
        {orderNumber.order.number}
      </div>
      <h3 className="text text_type_main-medium mt-8 mb-15">
        {"идентификатор заказа"}
      </h3>
      <img
        className={styles.order_details_confirmation}
        src={done}
        alt="Подтверждение"
      />
      <h4 className="text text_type_main-default mt-15 mb-2">
        {"Ваш заказ начали готовить "}
      </h4>
      <p className="text text_type_main-default text_color_inactive ">
        {"Дождитесь готовности на орбитальной станции"}
      </p>
    </section>
  );
}

export default OrderDetails;
