import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import styles from "./order-full-details.module.css";

import { TypeLiveOrderData, TypeLiveOrdersData } from "../../types/live-order-types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  TypeIngredienInfo,
  TypeOrderInfo,
  TypeUniqueIngredienInfo,
} from "../../types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

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
import Preloader from "../preloader/preloader";
import Modal from "../modal/modal";
import api from "../../utils/api";
import { loadOrderToShow } from "../../services/order-to-show/actions";

function OrderFullDetails(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const orderNumber = window.location.pathname.split("/").pop();
  const currentPath = window.location.pathname.split("/").slice(-2, -1)[0];

  const ingredientsSet = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  let orderToShow = useAppSelector((state) => {
    let orderToShow = state.liveuserorder.orders.filter(
      (i: TypeOrderInfo) => i.number === Number(orderNumber)
    )[0];

    if (orderToShow) {
      return orderToShow;
    }

    orderToShow = state.liveallorders.orders.filter(
      (i: TypeOrderInfo) => i.number === Number(orderNumber)
    )[0];

    if (orderToShow) {
      return orderToShow;
    }

    return state.ordertoshow.order_to_show;
  });

  useEffect(() => {
    if (!orderToShow) {
      //@ts-ignore
      dispatch(loadOrderToShow(orderNumber));
    }
  }, []);

  if (!orderToShow) {
    //@ts-ignore
    return null;
  }

  const orderToShowById = {};

  for (const num of orderToShow.ingredients) {
    //@ts-ignore
    orderToShowById[num] = orderToShowById[num] ? orderToShowById[num] + 1 : 1;
  }

  const orderToShowUnicueItems = orderToShow.ingredients.reduce(
    (acc: string | any[], item: any) => {
      if (acc.includes(item)) {
        return acc;
      }
      //@ts-ignore
      return [...acc, item];
    },
    []
  );

  const orderIngredientsFullInfo: any[] = [];
  //@ts-ignore
  orderToShowUnicueItems.forEach((ingredient: string | number) => {
    ingredientsSet.forEach((item: { _id: any }) => {
      if (item._id === ingredient) {
        orderIngredientsFullInfo.push({
          ...item,
          //@ts-ignore
          number: orderToShowById[ingredient],
        });
      }
    });
  });

  let sum = 0;
  for (let i = 0; i < orderIngredientsFullInfo.length; i++) {
    sum +=
      orderIngredientsFullInfo[i].price * orderIngredientsFullInfo[i].number;
  }

  let orderFullStatus = "Выполнен";
  let orderFullStatusDone = "rgba(0, 204, 204, 1)";
  if (orderToShow.status === "created") {
    orderFullStatus = "Создан";
    orderFullStatusDone = "";
  } else if (orderToShow.status === "pending") {
    orderFullStatus = "Готовится";
    orderFullStatusDone = "";
  }

  type TypeNumberedIngredienInfo = TypeIngredienInfo & {
    number: number;
  };

  return (
    <section className={styles.order_full_details_container}>
      <h3 className="text text_type_digits-default mt-20 ml-15">
        #{orderToShow.number}
      </h3>
      <h4 className="text text_type_main-medium mt-10 mr-5 ml-15">
        {orderToShow.name}
      </h4>
      <p
        className={`${styles.order_full_status}"text text_type_main-default mt-5 ml-15`}
        style={{ color: orderFullStatusDone }}
      >
        {orderFullStatus}
      </p>

      <p className="text text_type_main-medium mt-5 ml-15">Состав:</p>
      <ul className={`${styles.order_full_details_items} custom-scroll`}>
        {orderIngredientsFullInfo.map(
          (ingredient: TypeNumberedIngredienInfo, index: number) => (
            <li className={styles.order_full_ingredient_details} key={uuidv4()}>
              <div className={styles.order_full_details}>
                <div className={styles.order_full_ingredient_picture_container}>
                  <img src={ingredient.image_mobile} alt={ingredient.name} />
                </div>
                <div
                  className={`${styles.order_full_value_name} text text_type_main-default ml-5 mr-5`}
                >
                  {ingredient.name}
                </div>
              </div>
              <div className={styles.order_full_value_details}>
                <div className="text text_type_digits-default mr-4">
                  {ingredient.number} x {ingredient.price}
                </div>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )
        )}
      </ul>
      <div>
        <div className={styles.order_full_data_value_details}>
          <FormattedDate
            date={new Date(orderToShow.createdAt)}
            className="text text_type_main-default text_color_inactive ml-15"
          />
          <div className={styles.order_full_totalvalue_details}>
            <p className="text text_type_digits-default mr-4">{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderFullDetails;
