import { useState, useEffect } from "react";

import "./app.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

import api from "../utils/api";

function App() {
  const [ingredients, setIngredients] = useState([]);

  const [ingredientDetailsIsOpen, setIngredientDetailsIsOpen] = useState(false);
  const [orderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredientToShow, setSelectedIngredientToShow] = useState({});

  function handleIngredientDetailsIsClosed() {
    setIngredientDetailsIsOpen(false);
    closeAllPopup();
  }

  function handleOrderDetailsIsClosed() {
    setOrderDetailsIsOpen(false);
    closeAllPopup();
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

  function closeAllPopup() {
    setIngredientDetailsIsOpen(false);
    setOrderDetailsIsOpen(false);
  }

  return (
    <div className="App">
      <AppHeader />
      <section className="main">
        <BurgerIngredients
          ingredients={ingredients}
          handleOnOpen={handleIngredientDetailsIsOpen}
          onIngredientClick={setSelectedIngredient}
        />
        <BurgerConstructor
          ingredients={ingredients}
          handleOnOpen={handleOrderDetailsIsOpen}
        />
      </section>
      {(ingredientDetailsIsOpen || orderDetailsIsOpen) && (
        <Modal
          handleOnClose={
            (ingredientDetailsIsOpen && handleIngredientDetailsIsClosed) ||
            (orderDetailsIsOpen && handleOrderDetailsIsClosed)
          }
          ingredientDetailsIsOpen={ingredientDetailsIsOpen}
          orderDetailsIsOpen={orderDetailsIsOpen}
          ingredient={selectedIngredientToShow}
        />
      )}
    </div>
  );
}

export default App;
