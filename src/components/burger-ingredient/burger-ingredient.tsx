import { useRef } from "react";
import { useDrag } from "react-dnd";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredient.module.css";

import { TypeIngredientInfo } from "../../types/types";
import { useAppSelector } from "../../hooks/hooks";

interface IntBurgerIngredientProps {
  ingredient: TypeIngredientInfo;
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
    curr: TypeIngredientInfo
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

  const item: TypeIngredientInfo = ingredient;

  const [, drag] = useDrag(() => ({
    type: "ingredient",
    item: item,
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
