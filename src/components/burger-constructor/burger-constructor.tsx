import { useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";

import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";

import ConstructorComponent from "../constructor-component/constructor-component";

import { addIngredient } from "../../services/components/reducer";
import { loadOrder } from "../../services/order/actions";
import { TypeIngredienInfo } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

type TypeDragObject = {
  index: number;
  uniqueId: string;
};

type TypeDropCollectedProps = {
  isOver: boolean;
};

type TypeUniqueIngredienInfo = TypeIngredienInfo & {
  uniqueId: string;
};

function BurgerConstructor(): React.JSX.Element {
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const orderedIngredients = useAppSelector(
    (state) => state.components.orderedIngredients
  );

  const isUserLogged = useAppSelector((state) => state.user.user);

  const handleOrder = () => {
    if (isUserLogged) {
      const bun = orderedIngredients.find(
        (i: TypeIngredienInfo) => i.type === "bun"
      );
      const orderedIngredientsForPurshase = orderedIngredients.filter(
        (i: { type: string }) => i.type !== "bun"
      );
      orderedIngredientsForPurshase.push(bun);
      orderedIngredientsForPurshase.unshift(bun);
      const orderedIngredientsById: string[] = [];
      orderedIngredientsForPurshase.map((i: { _id: string }) =>
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

  const [{ isOver }, dropTarget] = useDrop<
    TypeDragObject,
    unknown,
    TypeDropCollectedProps
  >({
    accept: "ingredient",
    drop(item) {
      item.uniqueId = uuidv4();
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderTopIngredient = useCallback((ingredient: TypeIngredienInfo) => {
    return (
      <div
        className={`${styles.constructor_ingredient_container}`}
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
        />
      </div>
    );
  }, []);

  const renderIngredient = useCallback(
    (ingredient: TypeUniqueIngredienInfo, index: number) => {
      return (
        <ConstructorComponent
          ingredient={ingredient}
          index={index}
          key={ingredient.uniqueId}
        />
      );
    },
    []
  );

  const renderBottomIngredient = useCallback(
    (ingredient: TypeIngredienInfo) => {
      return (
        <div
          className={`${styles.constructor_ingredient_container}`}
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
          />
        </div>
      );
    },
    []
  );

  return (
    <section className={`${styles.constructor_container} `}>
      <div
        ref={dropTarget}
        className={`${styles.constructor_ingredients_container}`}
        style={
          !isOver
            ? { backgroundColor: "" }
            : { backgroundColor: "rgba(83, 70, 245, 0.3)" }
        }
      >
        {orderedIngredients.length > 0 &&
        orderedIngredients.some(
          (obj: TypeIngredienInfo) => obj.type === "bun"
        ) ? (
          <div>
            {orderedIngredients.map(
              (ingredient: TypeIngredienInfo, index: number) =>
                ingredient.type === "bun" && renderTopIngredient(ingredient)
            )}
          </div>
        ) : (
          <div
            className={`${styles.constructor_bun_top_container} text text_type_main-default`}
            style={
              !isOver
                ? { backgroundColor: "" }
                : { backgroundColor: "rgba(123, 33, 97, 0.7)" }
            }
          >
            Выберете булочку
          </div>
        )}

        <div
          className={`${styles.constructor_ingredients_secondary} custom-scroll`}
        >
          {orderedIngredients.length > 0 &&
          orderedIngredients.some(
            (obj: TypeIngredienInfo) => obj.type !== "bun"
          ) ? (
            <div className={styles.constructor_ingredients_container}>
              {orderedIngredients.map(
                (ingredient: TypeUniqueIngredienInfo, index: number) =>
                  ingredient.type !== "bun" &&
                  renderIngredient(ingredient, index)
              )}
            </div>
          ) : (
            <div
              className={`${styles.constructor_ingr_container} text text_type_main-default`}
              style={
                !isOver
                  ? { backgroundColor: "" }
                  : { backgroundColor: "rgba(104, 53, 218, 0.7)" }
              }
            >
              Выберете ингредиенты
            </div>
          )}
        </div>

        <div>
          {orderedIngredients.length > 0 &&
          orderedIngredients.some(
            (obj: TypeIngredienInfo) => obj.type === "bun"
          ) ? (
            <div>
              {orderedIngredients.map(
                (ingredient: TypeIngredienInfo, index: number) =>
                  ingredient.type === "bun" &&
                  renderBottomIngredient(ingredient)
              )}
            </div>
          ) : (
            <div
              className={`${styles.constructor_bun_bottom_container} text text__type_main-default`}
              style={
                !isOver
                  ? { backgroundColor: "" }
                  : { backgroundColor: "rgba(123, 33, 97, 0.7)" }
              }
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
            orderedIngredients.some((i: { type: string }) => i.type === "bun")
              ? false
              : true
          }
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
