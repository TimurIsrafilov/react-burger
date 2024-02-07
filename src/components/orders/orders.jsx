import { Link, useLocation, useMatch } from "react-router-dom";


import { v4 as uuidv4 } from "uuid";

import styles from "./orders.module.css";

import Order from "../order/order";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

import {
  connect as liveOrderConnect,
  disconnect as liveOrderDisconnect,
} from "../../services/live-user-orders/actions";

import {
  connect as liveOrdersConnect,
  disconnect as liveOrdersDisconnect,
} from "../../services/live-all-orders/actions";

import {
  FEED,
  FORGOT_PASSWORD,
  HOME,
  INGREDIENTS,
  INGREDIENT_ID,
  LOGIN,
  ORDERS,
  PROFILE,
  REGISTER,
  RESET_PASSWORD,
  LIVE_ORDER_SERVER_URL,
  LIVE_ORDERS_SERVER_URL,
} from "../../utils/constants";
import { useEffect } from "react";

function Orders({ path, ordersInfo }) {
  // : React.JSX.Element

  const orders = ordersInfo.orders;

  const dispatch = useAppDispatch();

  const location = useLocation();

    const currentUrl = window.location.pathname.split("/").pop();
  // const currentUrl = window.location.pathname.split("/").includes("orders");
  // const match = useMatch(FEED);
  const currentPath = window.location.pathname.split("/").includes("orders");




  const orderSocketInfo = useAppSelector((state) => state.liveuserorder.status);
  const ordersSocketInfo = useAppSelector((state) => state.liveallorders.status);

  const match = useMatch(ORDERS)


  // if (match   && orderSocketInfo === "OFFLINE") {
  //   dispatch(liveOrderConnect(LIVE_ORDER_SERVER_URL));
  // } else if (match && orderSocketInfo === "ONLINE") {
  //   dispatch(liveOrderDisconnect());
  // }

  // if (currentUrl === "orders" && orderSocketInfo === "OFFLINE") {
  //   dispatch(liveOrderConnect(LIVE_ORDER_SERVER_URL));
  // } else if (currentUrl !== "orders" && orderSocketInfo === "ONLINE") {
  //   dispatch(liveOrderDisconnect());
  // }



  useEffect(() => {
    if (currentPath && orderSocketInfo === "OFFLINE") {dispatch(liveOrderConnect(LIVE_ORDER_SERVER_URL))};
  },[currentUrl] )


  // useEffect(() => {
  //   if ((currentUrl !== "orders" && orderSocketInfo === "ONLINE")) {dispatch(liveOrderDisconnect())};
  // }, [currentUrl])




  // else if (currentUrl === "feed" && ordersSocketInfo === "OFFLINE") {
  //   dispatch(liveOrdersConnect(LIVE_ORDERS_SERVER_URL));
  // } else if (currentUrl !== "feed" && ordersSocketInfo === "ONLINE") {
  //   dispatch(liveOrdersDisconnect());
  // }

  return (
    <section className={`${styles.orders_container} custom-scroll`}>
      {orders
        ? orders.map((order) => (
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
