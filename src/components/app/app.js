import { useState, useEffect } from "react";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import api from "../../utils/api";

function App() {
  const [ingredients, setIngredients] = useState([]);

  const [ingredientDetailsIsOpen, setIngredientDetailsIsOpen] = useState(false);
  const [orderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredientToShow, setSelectedIngredientToShow] = useState({});

  function handleIngredientDetailsIsClosed() {
    setIngredientDetailsIsOpen(false);
    closeAllPopups();
  }

  function handleOrderDetailsIsClosed() {
    setOrderDetailsIsOpen(false);
    closeAllPopups();
  }

  function handleIngredientDetailsIsOpen() {
    setIngredientDetailsIsOpen(true);
  }

  function handleOrderDetailsIsOpen() {
    setOrderDetailsIsOpen(true);
  }

  useEffect(() => {
    api
      .getingredients()
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  useEffect(() => {
    if (ingredients.length !== 0) {
      setSelectedIngredientToShow(
        ingredients.find((ingr) => ingr._id === selectedIngredient)
      );
    }
  }, [selectedIngredient]);

  function closeAllPopups() {
    setIngredientDetailsIsOpen(false);
    setOrderDetailsIsOpen(false);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={ingredients}
          handleOnOpen={handleIngredientDetailsIsOpen}
          onIngredientClick={setSelectedIngredient}
        />
        <BurgerConstructor
          ingredients={ingredients}
          handleOnOpen={handleOrderDetailsIsOpen}
        />
      </main>
      {ingredientDetailsIsOpen && (
        <Modal
          handleOnClose={handleIngredientDetailsIsClosed}
          ingredientDetailsIsOpen={ingredientDetailsIsOpen}
          orderDetailsIsOpen={orderDetailsIsOpen}
        >
          <IngredientDetails ingredient={selectedIngredientToShow} />
        </Modal>
      )}
      {orderDetailsIsOpen && (
        <Modal
          handleOnClose={handleOrderDetailsIsClosed}
          orderDetailsIsOpen={orderDetailsIsOpen}
        >
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
