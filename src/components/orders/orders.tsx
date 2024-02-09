import { Link, useLocation } from "react-router-dom";

import styles from "./orders.module.css";

import Order from "../order/order";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

import { connect as liveOrderConnect } from "../../services/live-user-orders/actions";

import { LIVE_USER_ORDERS_SERVER_URL } from "../../utils/constants";
import { useEffect } from "react";
import { TypeLiveOrderData, TypeLiveOrdersData } from "../../types/types";

interface IntOrdersProps {
  path: string;
  ordersInfo: TypeLiveOrdersData;
}

function Orders({ path, ordersInfo }: IntOrdersProps): React.JSX.Element {
  const orders = ordersInfo.orders;

  const dispatch = useAppDispatch();
  const location = useLocation();

  const currentUrl = window.location.pathname.split("/").pop();
  const currentPath = window.location.pathname.split("/").includes("orders");

  const orderSocketInfo = useAppSelector((state) => state.liveuserorder.status);

  useEffect(() => {
    if (currentPath && orderSocketInfo === "OFFLINE") {
      dispatch(liveOrderConnect(LIVE_USER_ORDERS_SERVER_URL));
    }
  }, [currentUrl]);

  return (
    <section className={`${styles.orders_container} custom-scroll`}>
      {orders
        ? orders.map((order: TypeLiveOrderData) => (
            <Link
              className={styles.orders_link}
              to={`${path}/${order.number}`}
              state={{ backgroundLocation: location }}
              key={order.number}
            >
              <Order order={order} key={order.number} />
            </Link>
          ))
        : ""}
    </section>
  );
}

export default Orders;
