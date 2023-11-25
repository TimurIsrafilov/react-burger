import PropTypes from "prop-types";

import styles from "./ingredient-details.module.css";

function IngredientDetails(props) {
  return (
    <section className={styles.ingredient_details_container}>
      <h3 className="text text_type_main-large">{"Детали ингредиента"}</h3>
      <img
        className={styles.ingredient_details_picture}
        src={props.ingredient.image}
        alt="Ингридиент"
      />
      <h4 className="text text_type_main-medium mt-4 mb-15">
        {props.ingredient.name}
      </h4>
      <ul className={styles.ingredient_details_items}>
        <li className={styles.ingredient_details_item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <span className="text text_type_main-default text_color_inactive  mt-4">
            {props.ingredient.proteins}
          </span>
        </li>
        <li className={`${styles.ingredient_details_item} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <span className="text text_type_main-default text_color_inactive mt-4">
            {props.ingredient.fat}
          </span>
        </li>
        <li className={`${styles.ingredient_details_item} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <span className="text text_type_main-default text_color_inactive mt-4">
            {props.ingredient.carbohydrates}
          </span>
        </li>
        <li className={`${styles.ingredient_details_item} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <span className="text text_type_main-default text_color_inactive mt-4">
            {props.ingredient.calories}
          </span>
        </li>
      </ul>
    </section>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.object,
};

export default IngredientDetails;
