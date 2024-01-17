import styles from "./ingredients.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function Ingredients(): React.JSX.Element {
  return (
    <section className={styles.ingredients_container}>
      <IngredientDetails />
    </section>
  );
}

export default Ingredients;
