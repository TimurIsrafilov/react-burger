import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import styles from "./ingredient-details.module.css";

function IngredientDetails() {
  const { ingredientId } = useParams();

  const ingredientsSet = useSelector((store) => store.ingredients.ingredients);

  const ingredientToShow =
    ingredientsSet.length > 0 &&
    ingredientsSet.filter((ingredient) => ingredient._id === ingredientId)[0];

  return (
    <section className={styles.ingredient_details_container}>
      <h3 className="text text_type_main-large">{"Детали ингредиента"}</h3>
      <img
        className={styles.ingredient_details_picture}
        src={ingredientToShow.image}
        alt="Ингридиент"
      />
      <h4 className="text text_type_main-medium mt-4 mb-15">
        {ingredientToShow.name}
      </h4>
      <ul className={styles.ingredient_details_items}>
        <li className={styles.ingredient_details_item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <span className="text text_type_main-default text_color_inactive  mt-4">
            {ingredientToShow.proteins}
          </span>
        </li>
        <li className={`${styles.ingredient_details_item} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <span className="text text_type_main-default text_color_inactive mt-4">
            {ingredientToShow.fat}
          </span>
        </li>
        <li className={`${styles.ingredient_details_item} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <span className="text text_type_main-default text_color_inactive mt-4">
            {ingredientToShow.carbohydrates}
          </span>
        </li>
        <li className={`${styles.ingredient_details_item} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <span className="text text_type_main-default text_color_inactive mt-4">
            {ingredientToShow.calories}
          </span>
        </li>
      </ul>
    </section>
  );
}

export default IngredientDetails;
