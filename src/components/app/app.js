import { useState, useEffect, useCallback } from "react";

import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

// import api from "../../utils/api";


// import { loadIngredients } from "../../services/actions";

function App() {
  // const dispatch = useDispatch();

  // const [ingredients, setIngredients] = useState([]);

  const [orderedIngredients, setOrderedIngredients] = useState([]);

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

  // no redux
  // useEffect(() => {
  //   api
  //     .getingredients()
  //     .then((res) => setIngredients(res.data))
  //     .catch((err) => console.log(`Ошибка.....: ${err}`));
  // }, []);

  // const {loading, error} = useSelector(store => store.ingredients);

  // toolkit
  // useEffect(() => {
  //   dispatch(loadIngredients())
  // }, []);




function closeAllPopups() {
  setIngredientDetailsIsOpen(false);
  setOrderDetailsIsOpen(false);
}




  // useEffect(() => {
  //   if (ingredients.length !== 0) {
  //     setSelectedIngredientToShow(
  //       ingredients.find((ingr) => ingr._id === selectedIngredient)
  //     );
  //   }
  // }, [selectedIngredient]);

  function closeAllPopups() {
    setIngredientDetailsIsOpen(false);
    setOrderDetailsIsOpen(false);
  }

  // const onDropHandler = (item) => {
  //   if (item.type === "bun") {
  //     setOrderedIngredients([
  //       ...ingredients.filter((element) => element._id === item.id),
  //       ...orderedIngredients.filter((element) => element.type !== item.type),
  //     ]);
  //   } else {
  //     setOrderedIngredients([
  //       ...ingredients
  //         .filter((element) => element._id === item.id)
  //         .map((v) => ({ ...v, uniqueId: uuidv4() })),

  //       ...orderedIngredients,
  //     ]);
  //   }
  // };

  const moveIngredient = (dragIndex, hoverIndex) => {
    const dragIngredient = orderedIngredients[dragIndex];
    const newIngredients = [...orderedIngredients];

    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredient);

    setOrderedIngredients(newIngredients);
  };

  return (
    <div className={styles.app}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <main className={styles.main}>
          {/* {ingredients.length > 0 && ( */}
            <BurgerIngredients
              // ingredients={ingredients}
              handleOnOpen={handleIngredientDetailsIsOpen}
              onIngredientClick={setSelectedIngredient}
              // moveIngredient={moveIngredient}
              orderedIngredients={orderedIngredients}
            />
          {/* )} */}
          <BurgerConstructor
            // ingredients={ingredients}
            handleOnOpen={handleOrderDetailsIsOpen}
            // onDropHandler={onDropHandler}
            orderedIngredients={orderedIngredients}
            moveIngredient={moveIngredient}
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
      </DndProvider>
    </div>
  );
}

export default App;
