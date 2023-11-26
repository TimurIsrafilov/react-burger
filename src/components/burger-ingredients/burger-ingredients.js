import PropTypes from "prop-types";
import { useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

function BurgerIngredients(props) {
  const [current, setCurrent] = useState("one");

  return (
    <section className={`${styles.ingredients} custom-scroll mb-10`}>
      <h2
        className={`${styles.ingredients_title} text text_type_main-large mt-4 mb-4`}
      >
        Соберите бургер
      </h2>
      <div className={styles.ingredients_types_menu}>
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
      <div className={`${styles.ingredients_container} custom-scroll mt-10`}>
        <div className={`${styles.ingredients_type} mt-10`}>
          <h3
            className={`${styles.ingredients_type_title} text text_type_main-medium mt-4 mb-4`}
          >
            Булки
          </h3>
          <div className={styles.ingredients_cards}>
            {props.ingredients.map(
              (ingredient) =>
                ingredient.type === "bun" && (
                  <BurgerIngredient
                    ingredients={props.ingredients}
                    ingredient={ingredient}
                    key={ingredient._id}
                    handleOnOpen={props.handleOnOpen}
                    onIngredientClick={props.onIngredientClick}
                  />
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
            {props.ingredients.map(
              (ingredient) =>
                ingredient.type === "sauce" && (
                  <BurgerIngredient
                    ingredients={props.ingredients}
                    ingredient={ingredient}
                    key={ingredient._id}
                    handleOnOpen={props.handleOnOpen}
                    onIngredientClick={props.onIngredientClick}
                  />
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
            {props.ingredients.map(
              (ingredient) =>
                ingredient.type === "main" && (
                  <BurgerIngredient
                    ingredients={props.ingredients}
                    ingredient={ingredient}
                    key={ingredient._id}
                    handleOnOpen={props.handleOnOpen}
                    onIngredientClick={props.onIngredientClick}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array,
  handleOnOpen: PropTypes.func,
  onIngredientClick: PropTypes.func,
};

export default BurgerIngredients;
