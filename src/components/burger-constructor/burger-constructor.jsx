import { useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDrop } from "react-dnd";

import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";

import ConstructorComponent from "../constructor-component/constructor-component";

import {
  addIngredient,
  moveIngredient,
} from "../../services/components/actions";

import { loadOrder } from "../../services/order/actions";

function BurgerConstructor() {
  const navigate = useNavigate();

  const ref = useRef(null);

  const dispatch = useDispatch();

  function handleOnMoveIngredient(dragIndex, hoverIndex) {
    dispatch(moveIngredient(dragIndex, hoverIndex));
  }

  const orderedIngredients = useSelector(
    (store) => store.components.orderedIngredients
  );

  const isUserLogged = useSelector((store) => store.user.user);

  const handleOrder = () => {
    if (isUserLogged) {
      const bun = orderedIngredients.find((i) => i.type === "bun");
      const orderedIngredientsForPurshase = orderedIngredients.filter(
        (i) => i.type !== "bun"
      );
      orderedIngredientsForPurshase.push(bun);
      orderedIngredientsForPurshase.unshift(bun);
      const orderedIngredientsById = [];
      orderedIngredientsForPurshase.map((i) =>
        orderedIngredientsById.push(i._id)
      );

      dispatch(loadOrder(orderedIngredientsById));
    } else {
      navigate("/login", { replace: true });
    }
  };

  const summa = useMemo(() => suma(), [orderedIngredients]);

  function suma() {
    let sum = 0;

    for (let i = 0; i < orderedIngredients.length; i++) {
      if (orderedIngredients[i].type !== "bun") {
        sum += orderedIngredients[i].price;
      } else {
        sum += orderedIngredients[i].price * 2;
      }
    }
    return sum;
  }

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  const renderTopIngredient = useCallback((ingredient, index) => {
    return (
      <div
        className={`${styles.constructor_ingredient_container}

         `}
        key={Math.random()}
      >
        <div className={styles.constructor_ingredient_shift}>
          {ingredient.type !== "bun" && <DragIcon type="primary" />}
        </div>

        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredient.name} (верх)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
          key={ingredient._id}
          index={index}
          id={ingredient._id}
        />
      </div>
    );
  }, []);

  const renderIngredient = useCallback((ingredient, index) => {
    return (
      <ConstructorComponent
        ingredient={ingredient}
        index={index}
        handleOnMoveIngredient={handleOnMoveIngredient}
        key={ingredient.uniqueId}
      />
    );
  }, []);

  const renderBottomIngredient = useCallback((ingredient, index) => {
    return (
      <div
        className={`${styles.constructor_ingredient_container} 
      
        `}
        key={Math.random()}
      >
        <div className={styles.constructor_ingredient_shift}>
          {ingredient.type !== "bun" && <DragIcon type="primary" />}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredient.name} (низ)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
          key={ingredient._id}
          index={index}
          id={ingredient._id}
        />
      </div>
    );
  }, []);

  return (
    <section className={`${styles.constructor_container} `}>
      <div
        ref={dropTarget}
        className={`${styles.constructor_ingredients_container}`}
      >
        {orderedIngredients.length > 0 &&
        orderedIngredients.some((obj) => obj.type === "bun") ? (
          <div>
            {orderedIngredients.map(
              (ingredient, index) =>
                ingredient.type === "bun" &&
                renderTopIngredient(ingredient, index)
            )}
          </div>
        ) : (
          <div
            className={`${styles.constructor_bun_top_container} text text_type_main-default`}
          >
            Выберете булочку
          </div>
        )}

        <div
          className={`${styles.constructor_ingredients_secondary} custom-scroll`}
        >
          {orderedIngredients.length > 0 &&
          orderedIngredients.some((obj) => obj.type !== "bun") ? (
            <div className={styles.constructor_ingredients_container}>
              {orderedIngredients.map(
                (ingredient, index) =>
                  ingredient.type !== "bun" &&
                  renderIngredient(ingredient, index)
              )}
            </div>
          ) : (
            <div
              className={`${styles.constructor_ingr_container} text text_type_main-default`}
            >
              Выберете ингредиенты
            </div>
          )}
        </div>

        <div>
          {orderedIngredients.length > 0 &&
          orderedIngredients.some((obj) => obj.type === "bun") ? (
            <div>
              {orderedIngredients.map(
                (ingredient, index) =>
                  ingredient.type === "bun" &&
                  renderBottomIngredient(ingredient, index)
              )}
            </div>
          ) : (
            <div
              className={`${styles.constructor_bun_bottom_container} text text__type_main-default`}
            >
              Выберете булочку
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.constructor_total_price} mt-10`}>
        <div className={`${styles.constructor_ingredient_value} mr-5`}>
          <div className="text text_type_digits-default mr-2">{summa}</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrder}
          disabled={
            orderedIngredients.some((i) => i.type === "bun") ? false : true
          }
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
