import styles from "./ingredients.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function Ingredients() {
  return (
    <section className={styles.ingredients_container}>
      <IngredientDetails />
    </section>
  );
}

export default Ingredients;
