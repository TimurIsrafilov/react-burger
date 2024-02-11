import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import { TypeIngredientInfo } from "../../types/types";
import { useAppSelector } from "../../hooks/hooks";
import { INGREDIENTS } from "../../utils/constants";

function BurgerIngredients(): React.JSX.Element {
  const location = useLocation();

  const [current, setCurrent] = useState("one");

  const ref = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    if (scrollTop <= 270) {
      setCurrent("one");
    } else if (scrollTop > 270 && scrollTop <= 750) {
      setCurrent("two");
    } else if (scrollTop > 750) setCurrent("three");
  }, [scrollTop]);

  const ingredientsSet = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  return (
    <section className={`${styles.ingredients} custom-scroll mb-10`}>
      <h2
        className={`${styles.ingredients_title} text text_type_main-large mt-4 mb-4`}
      >
        Соберите бургер
      </h2>
      <div ref={ref} className={styles.ingredients_types_menu}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.ingredients_container} custom-scroll mt-10`}
        onScroll={handleScroll}
      >
        <div className={`${styles.ingredients_type} mt-10`}>
          <h3
            className={`${styles.ingredients_type_title} text text_type_main-medium mt-4 mb-4`}
          >
            Булки
          </h3>
          <div className={styles.ingredients_cards}>
            {ingredientsSet.map(
              (ingredient: TypeIngredientInfo) =>
                ingredient.type === "bun" && (
                  <Link
                    className={styles.ingredients_link}
                    key={ingredient._id}
                    to={`${INGREDIENTS}/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                  >
                    <BurgerIngredient
                      ingredient={ingredient}
                      key={ingredient._id}
                    />
                  </Link>
                )
            )}
          </div>
        </div>
        <div className={`${styles.ingredients_type} mt-10`}>
          <h3
            className={`${styles.ingredients_type_title} text text_type_main-medium mt-4 mb-4`}
          >
            Соусы
          </h3>
          <div className={styles.ingredients_cards}>
            {ingredientsSet.map(
              (ingredient: TypeIngredientInfo) =>
                ingredient.type === "sauce" && (
                  <Link
                    className={styles.ingredients_link}
                    key={ingredient._id}
                    to={`${INGREDIENTS}/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                  >
                    <BurgerIngredient
                      ingredient={ingredient}
                      key={ingredient._id}
                    />
                  </Link>
                )
            )}
          </div>
        </div>
        <div className={`${styles.ingredients_type} mt-10`}>
          <h3
            className={`${styles.ingredients_type_title} text text_type_main-medium mt-4 mb-4`}
          >
            Начинки
          </h3>
          <div className={styles.ingredients_cards}>
            {ingredientsSet.map(
              (ingredient: TypeIngredientInfo) =>
                ingredient.type === "main" && (
                  <Link
                    className={styles.ingredients_link}
                    key={ingredient._id}
                    to={`${INGREDIENTS}/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                  >
                    <BurgerIngredient
                      ingredient={ingredient}
                      key={ingredient._id}
                    />
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
