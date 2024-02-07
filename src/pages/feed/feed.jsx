import { v4 as uuidv4 } from "uuid";
import Orders from "../../components/orders/orders";

import styles from "./feed.module.css";

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
  NUMBER,
} from "../../utils/constants";
import { useMatch } from "react-router";
import { useEffect } from "react";

function Feed() {
  const ordersInfo = useAppSelector((state) => state.liveallorders.live_all_orders);

  const commonOrders = ordersInfo.orders;

  const commonOrdersDone = [];
  const commonOrdersInProgress = [];

  const arrayCheck = commonOrders
    ? commonOrders.forEach((i) => {
        if (i.status === "done") {
          commonOrdersDone.push(i.number);
        } else commonOrdersInProgress.push(i.number);
      })
    : [];

  const dispatch = useAppDispatch();

  const currentUrl = window.location.pathname.split("/").pop();
  // const currentUrl = window.location.pathname.split("/").includes("feed");
  const currentPath = window.location.pathname.split("/").includes("feed");

  const orderSocketInfo = useAppSelector((state) => state.liveuserorder.status);
  const ordersSocketInfo = useAppSelector((state) => state.liveallorders.status);

  // if (currentUrl === "feed" && ordersSocketInfo === "OFFLINE") {
  //   dispatch(liveOrdersConnect(LIVE_ORDERS_SERVER_URL));
  // } else if (currentUrl !== "feed" && ordersSocketInfo === "ONLINE") {
  //   dispatch(liveOrdersDisconnect());
  // }
  // const match = useMatch (FEED)
  
  // if (match    && ordersSocketInfo === "OFFLINE") {
  //   dispatch(liveOrderConnect(LIVE_ORDER_SERVER_URL));
  // } else if (match.pathname !== FEED && ordersSocketInfo === "ONLINE") {
  //   dispatch(liveOrderDisconnect());
  // }

// if (currentUrl === "feed" && ordersSocketInfo === "OFFLINE") {
//     dispatch(liveOrdersConnect(LIVE_ORDERS_SERVER_URL));
//   } else if (currentUrl !== "feed" && ordersSocketInfo === "ONLINE") {
//     dispatch(liveOrdersDisconnect());
//   }


useEffect(() => {
  if (currentPath  && ordersSocketInfo === "OFFLINE") {dispatch(liveOrdersConnect(LIVE_ORDERS_SERVER_URL))};
},[currentUrl] )


// useEffect(() => {
//   if ((currentUrl !== "feed" && ordersSocketInfo === "ONLINE")) {dispatch(liveOrdersDisconnect())};
// }, [currentUrl])
  

  return ordersInfo ? (
    <section className={styles.feed_container}>
      <h1 className={"text text_type_main-large mt-5 mb-5"}>Лента заказов</h1>
      <div className={styles.feed_common_container}>
        <Orders path={`${FEED}`} ordersInfo={ordersInfo} />
        <div className={styles.feed_orders_container}>
          <div className={styles.feed_orders_status}>
            <div className={styles.feed_orders_done}>
              <p className="text text_type_main-medium mb-5">Готовы:</p>
              <div className={styles.feed_done_text_container}>
                {commonOrdersDone.slice(0, 20).map((order) => (
                  <p
                    className={`${styles.feed_done_text_container} text text_type_digits-default`}
                    key={uuidv4()}
                  >
                    {order}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.feed_orders_inprogress}>
              <p className="text text_type_main-medium mb-5">В работе:</p>
              <div className={styles.feed_inprogress_text_container}>
                {commonOrdersInProgress.slice(0, 20).map((order) => (
                  <p
                    className={`${styles.feed_inprogress_text} text text_type_digits-default`}
                    key={uuidv4()}
                  >
                    {order}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.order_orders_all}>
            <p className="text text_type_main-medium mb-5">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">{ordersInfo.total}</p>
          </div>
          <div className={styles.order_orders_today}>
            <p className="text text_type_main-medium mb-5">
              Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">
              {ordersInfo.totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div></div>
  );
}

export default Feed;
