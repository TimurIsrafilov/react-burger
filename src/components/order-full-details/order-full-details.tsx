import { v4 as uuidv4 } from "uuid";

import styles from "./order-full-details.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TypeIngredientInfo, TypeLiveOrderData } from "../../types/types";
import { useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { loadOrderToShow } from "../../services/order-to-show/actions";

interface IntOrderToShowById {
  [index: string]: number;
}

function OrderFullDetails(): React.JSX.Element | null {
  const dispatch = useAppDispatch();

  const orderNumber = window.location.pathname.split("/").pop();

  const ingredientsSet = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  let orderToShow = useAppSelector((state) => {
    let orderToShow = state.liveuserorder.orders.filter(
      (i: TypeLiveOrderData) => i.number === Number(orderNumber)
    )[0];

    if (orderToShow) {
      return orderToShow;
    }

    orderToShow = state.liveallorders.orders.filter(
      (i: TypeLiveOrderData) => i.number === Number(orderNumber)
    )[0];

    if (orderToShow) {
      return orderToShow;
    }

    return state.ordertoshow.ordertoshow;
  });

  useEffect(() => {
    if (!orderToShow) {
      dispatch(loadOrderToShow(orderNumber));
    }
  }, []);

  if (!orderToShow) {
    return null;
  }

  const orderToShowById: IntOrderToShowById = {};

  for (const num of orderToShow.ingredients) {
    orderToShowById[num] = orderToShowById[num] ? orderToShowById[num] + 1 : 1;
  }

  const orderToShowUniqueItems = orderToShow.ingredients.reduce(
    (acc: string[], item: string) => {
      if (acc.includes(item)) {
        return acc;
      }

      return [...acc, item];
    },
    []
  );

  const orderIngredientsFullInfo: any[] = [];

  orderToShowUniqueItems.forEach((ingredient: string) => {
    ingredientsSet.forEach((item: { _id: any }) => {
      if (item._id === ingredient) {
        orderIngredientsFullInfo.push({
          ...item,

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

  type TypeNumberedIngredientInfo = TypeIngredientInfo & {
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
          (ingredient: TypeNumberedIngredientInfo, index: number) => (
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
