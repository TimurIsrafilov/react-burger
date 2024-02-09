import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Orders from "../../components/orders/orders";

import styles from "./feed.module.css";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

import { connect as liveOrdersConnect } from "../../services/live-all-orders/actions";

import { FEED, LIVE_ALL_ORDERS_SERVER_URL } from "../../utils/constants";

import { TypeLiveOrderData } from "../../types/types";

function Feed(): React.JSX.Element {
  const ordersInfo = useAppSelector((state) => state.liveallorders.orders_data);

  const commonOrders = ordersInfo.orders;

  const commonOrdersDone: Array<number> = [];
  const commonOrdersInProgress: Array<number> = [];

  const arrayCheck = commonOrders
    ? commonOrders.forEach((i: TypeLiveOrderData) => {
        if (i.status === "done") {
          commonOrdersDone.push(i.number);
        } else commonOrdersInProgress.push(i.number);
      })
    : [];

  const dispatch = useAppDispatch();

  const currentUrl = window.location.pathname.split("/").pop();
  const currentPath = window.location.pathname.split("/").includes("feed");

  const ordersSocketInfo = useAppSelector(
    (state) => state.liveallorders.status
  );

  useEffect(() => {
    if (currentPath && ordersSocketInfo === "OFFLINE") {
      dispatch(liveOrdersConnect(LIVE_ALL_ORDERS_SERVER_URL));
    }
  }, [currentUrl]);

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
