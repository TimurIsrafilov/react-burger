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

import {
  addIngredient,
  selectOrderedIngredients,
  selectedBun,
} from "../../services/components/reducer";
import { loadOrder } from "../../services/order/actions";
import { TypeIngredientInfo } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

type TypeDropCollectedProps = {
  isOver: boolean;
};

type TypeUniqueIngredientInfo = TypeIngredientInfo & {
  uniqueId: string;
};

function BurgerConstructor(): React.JSX.Element {
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const orderedIngredients = useAppSelector(selectOrderedIngredients);

  const bun = useAppSelector(selectedBun);

  const isUserLogged = useAppSelector((state) => state.user.user);

  const handleOrder = () => {
    if (isUserLogged) {
      if (!bun) {
        return;
      }
      const orderedIngredientsById = [bun._id];
      orderedIngredients.map((i: { _id: string }) =>
        orderedIngredientsById.push(i._id)
      );
      orderedIngredientsById.push(bun._id);

      dispatch(loadOrder(orderedIngredientsById));
    } else {
      navigate("/login", { replace: true });
    }
  };

  const summa = useMemo(() => {
    let sum = 0;

    for (let i = 0; i < orderedIngredients.length; i++) {
      if (orderedIngredients[i].type !== "bun") {
        sum += orderedIngredients[i].price;
      }
    }

    if (bun) {
      sum += bun.price * 2;
    }

    return sum;
  }, [orderedIngredients, bun]);

  const [{ isOver }, dropTarget] = useDrop<
    TypeIngredientInfo,
    unknown,
    TypeDropCollectedProps
  >({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient({ ...item, uniqueId: uuidv4() }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderTopIngredient = useCallback((ingredient: TypeIngredientInfo) => {
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
    (ingredient: TypeUniqueIngredientInfo, index: number) => {
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
    (ingredient: TypeIngredientInfo) => {
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
        data-testid="drop_target"
        ref={dropTarget}
        className={`${styles.constructor_ingredients_container}`}
        style={
          !isOver
            ? { backgroundColor: "" }
            : { backgroundColor: "rgba(83, 70, 245, 0.3)" }
        }
      >
        {bun ? (
          renderTopIngredient(bun)
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
          {orderedIngredients.length > 0 ? (
            <div className={styles.constructor_ingredients_container}>
              {orderedIngredients.map(
                (ingredient: TypeUniqueIngredientInfo, index: number) =>
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
          {bun ? (
            renderBottomIngredient(bun)
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
          disabled={bun ? false : true}
          data-testid="submit_button"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
