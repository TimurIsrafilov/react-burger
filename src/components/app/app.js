import { useSelector } from "react-redux";

import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider } from "react-dnd";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import { useDispatch } from "react-redux";

import { closeIngredient } from "../../services/ingredient/actions";
import { closeOrder } from "../../services/order/actions";

function App() {
  const isIngredientModalOpen = useSelector(
    (store) => store.ingredient.showIngredient
  );
  const isOrdertModalOpen = useSelector((store) => store.order.orderInfo);

  const dispatch = useDispatch();

  function handleOnClose() {
    dispatch(closeIngredient());
    dispatch(closeOrder());
  }

  return (
    <div className={styles.app}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
        {isIngredientModalOpen && (
          <Modal handleOnClose={handleOnClose}>
            <IngredientDetails />
          </Modal>
        )}
        {isOrdertModalOpen && (
          <Modal handleOnClose={handleOnClose}>
            <OrderDetails />
          </Modal>
        )}
      </DndProvider>
    </div>
  );
}

export default App;
