import styles from "./home.module.css";

import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider } from "react-dnd";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import OrderDetails from "../../components/order-details/order-details";
import Modal from "../../components/modal/modal";

import { closeOrder } from "../../services/order/reducer";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

function Home(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const isOrdertModalOpen = useAppSelector((state) => state.order.order);

  function handleOnClose() {
    dispatch(closeOrder());
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
        {isOrdertModalOpen && (
          <Modal handleOnClose={handleOnClose}>
            <OrderDetails />
          </Modal>
        )}
      </DndProvider>
    </div>
  );
}

export default Home;
