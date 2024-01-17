import { useRef } from "react";
import { useDrag } from "react-dnd";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredient.module.css";

import { showIngredient } from "../../services/ingredient/reducer";
import { TypeIngredienInfo } from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

interface IntBurgerIngredientProps {
  ingredient: TypeIngredienInfo;
}

interface ObjectAccInterface {
  [key: string]: number;
}

function BurgerIngredient({
  ingredient,
}: IntBurgerIngredientProps): React.JSX.Element {
  const ref = useRef<HTMLImageElement>(null);

  const orderedIngredients = useAppSelector(
    (state) => state.components.orderedIngredients
  );

  const orderedIngredientsNumber = orderedIngredients.reduce(function (
    acc: ObjectAccInterface,
    curr: TypeIngredienInfo
  ) {
    return acc[curr._id] ? ++acc[curr._id] : (acc[curr._id] = 1), acc;
  },
  {});

  const myFunc = (
    thisObj: ObjectAccInterface,
    property: string,
    type: string
  ) => {
    if (type === "bun") {
      const orderedIngredientCounty = thisObj[property];
      return orderedIngredientCounty + 1;
    } else {
      const orderedIngredientCounty = thisObj[property];
      return orderedIngredientCounty;
    }
  };

  const orderedIngredientCounty = myFunc(
    orderedIngredientsNumber,
    ingredient._id,
    ingredient.type
  );

  const dispatch = useAppDispatch();

  const onIngredientClick = () => {
    dispatch(showIngredient(item));
  };

  const item: TypeIngredienInfo = ingredient;

  const [, drag] = useDrag(() => ({
    type: "ingredient",
    item: { item },
  }));

  return (
    <section className={styles.ingredient_card}>
      {orderedIngredientCounty ? (
        <div
          className={`${styles.ingredient_counter} "text text_type_digits-default`}
        >
          {orderedIngredientCounty}
        </div>
      ) : (
        ""
      )}
      <div>
        <img
          ref={drag}
          className={styles.ingredient_picture}
          src={ingredient.image}
          alt={ingredient.name}
          onClick={onIngredientClick}
        />
      </div>
      <div className={`${styles.ingredient_value} mt-1 mb-4`}>
        <div className="text text_type_digits-default mr-3">
          {ingredient.price}
        </div>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </section>
  );
}

export default BurgerIngredient;
