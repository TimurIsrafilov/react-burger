import PropTypes from "prop-types";

import { useRef } from "react";
import { useDrag } from "react-dnd";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredient.module.css";

import { useDispatch, useSelector } from "react-redux";

import { showIngredient } from "../../services/ingredient/actions";

function BurgerIngredient(props) {
  const ref = useRef(null);

  const orderedIngredients = useSelector(
    (store) => store.components.orderedIngredients
  );

  const orderedIngredientsNumber = orderedIngredients.reduce(function (
    acc,
    curr
  ) {
    return acc[curr._id] ? ++acc[curr._id] : (acc[curr._id] = 1), acc;
  },
  {});

  const myFunc = (thisObj, property, type) => {
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
    props.ingredient._id,
    props.ingredient.type
  );

  const dispatch = useDispatch();

  const onIngredientClick = () => {
    dispatch(showIngredient(item));
  };

  const item = props.ingredient;

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
          src={props.ingredient.image}
          alt={props.ingredient.name}
          onClick={onIngredientClick}
        />
      </div>
      <div className={`${styles.ingredient_value} mt-1 mb-4`}>
        <div className="text text_type_digits-default mr-3">
          {props.ingredient.price}
        </div>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text__type_main-default">{props.ingredient.name}</p>
    </section>
  );
}

BurgerIngredient.propTypes = {
  ingredient: PropTypes.object,
};

export default BurgerIngredient;
