import { useRef, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./order.module.css";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TypeIngredienInfo } from "../../types/types";
import { TypeLiveOrderData } from "../../types/live-order-types";
//@ts-ignore
function Order({ order }: TypeLiveOrderData): React.JSX.Element {
  const now = new Date();
  const currentDate = now.toISOString();
  const orderDate = order.createdAt;

  const currentDateNumber = currentDate.split("-").join("").substring(0, 8);
  const orderDateNumber = orderDate.split("-").join("").substring(0, 8);

  const currentDateDay = currentDateNumber.substring(7, 8);
  const orderDateDay = orderDateNumber.substring(7, 8);

  const currentDateMs = now.getTime();
  const orderDateMs = Date.parse(orderDate);

  const dataMsDelta = (currentDateMs - orderDateMs) / 86400000;

  const orderTime = orderDate.substring(11, 16);

  let orderInfo = "";
  if (currentDateNumber === orderDateNumber) {
    orderInfo = `Cегодня, ${orderTime}`;
  } else if (dataMsDelta < 2 && currentDateDay !== orderDateDay) {
    orderInfo = `Вчера, ${orderTime}`;
  } else if (dataMsDelta > 2 && dataMsDelta < 5) {
    orderInfo = `${Math.floor(dataMsDelta)} дня назад, ${orderTime}`;
  } else orderInfo = `${Math.floor(dataMsDelta)} дней назад, ${orderTime}`;

  const orderIngredients = order.ingredients;
  const ingredientsSet = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  const orderIngredientsFullInfo: any[] = [];
  orderIngredients.forEach((ingredient: string) => {
    ingredientsSet.forEach((item: TypeIngredienInfo) => {
      if (item._id === ingredient) {
        orderIngredientsFullInfo.push(item);
      }
    });
  });

  let orderStatus = "Выполнен";
  let orderStatusDone = "rgba(0, 204, 204, 1)";
  if (order.status === "created") {
    orderStatus = "Создан";
    orderStatusDone = "rgba(242, 242, 243, 1)";
  } else if (order.status === "pending") {
    orderStatus = "Готовится";
    orderStatusDone = "rgba(242, 242, 243, 1)";
  }

  const summa = useMemo(() => suma(), [orderIngredientsFullInfo]);

  function suma() {
    let sum = 0;

    for (let i = 0; i < orderIngredientsFullInfo.length; i++) {
      sum += orderIngredientsFullInfo[i].price;
    }
    return sum;
  }

  const currentUrl = window.location.pathname.split("/").includes("feed");

  return (
    <section className={styles.order_container}>
      <div className={styles.order_main_part}>
        <p className="text text_type_digits-default mt-5 mb-5">
          {`#${order.number}`}
        </p>
        <h2 className={`${styles.order_title} text text_type_main-medium mb-5`}>
          {order.name}
        </h2>
        {!currentUrl ? (
          <p
            className={`${styles.order_status} text text_type_main-default mb-5`}
            style={{ color: orderStatusDone }}
          >
            {orderStatus}
          </p>
        ) : (
          ""
        )}
        <div className={styles.order_ingredient_pictures}>
          {orderIngredientsFullInfo.slice(0, 6).map((ingredient, index) => (
            <div key={uuidv4()}>
              <div
                className={styles.order_ingredient_picture_container}
                style={{
                  right: `${index * 20}px`,
                  zIndex: `${index * 1}`,
                }}
              >
                <img
                  className={styles.order_ingredient_picture}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                  style={{
                    opacity: `${
                      index > 4 && orderIngredientsFullInfo.length > 6
                        ? "0.3"
                        : "1"
                    }`,
                  }}
                />
                <p className={styles.order_ingredient_number}>
                  {index > 4 && orderIngredientsFullInfo.length > 6
                    ? `+ ${orderIngredientsFullInfo.length - 6}`
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.order_secondary_part}>
        <p className="text text_type_main-default text_color_inactive mb-30">
          {orderInfo}
        </p>
        <div className={styles.order_secondary_value}>
          <div className="text text_type_digits-default mr-2">{summa}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default Order;
