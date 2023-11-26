import PropTypes from "prop-types";

import counter from "../../images/counter.svg";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredient.module.css";

function BurgerIngredient(props) {
  const onIngredientClick = () => {
    props.handleOnOpen();
    props.onIngredientClick(props.ingredient._id);
  };

  return (
    <section className={styles.ingredient_card}>
      <img
        className={styles.ingredient_counter}
        src={counter}
        alt="Количество"
      />
      <img
        className={styles.ingredient_picture}
        src={props.ingredient.image}
        alt={props.ingredient.name}
        onClick={onIngredientClick}
      />
      <div className={`${styles.ingredient_value} mt-1 mb-4`}>
        <div className="text text_type_digits-default mr-3">{props.ingredient.price}</div>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text__type_main-default">{props.ingredient.name}</p>
    </section>
  );
}

BurgerIngredient.propTypes = {
  handleOnOpen: PropTypes.func,
  onIngredientClick: PropTypes.func,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};

export default BurgerIngredient;
