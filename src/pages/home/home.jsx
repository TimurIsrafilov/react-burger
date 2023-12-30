import { useSelector, useDispatch } from "react-redux";

import styles from "./home.module.css";

import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider } from "react-dnd";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import OrderDetails from "../../components/order-details/order-details";
import Modal from "../../components/modal/modal";

import { closeOrder } from "../../services/order/actions";

function Home() {
  const dispatch = useDispatch();

  const isOrdertModalOpen = useSelector((store) => store.order.order);

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
            <OrderDetails handleOnClose={handleOnClose} />
          </Modal>
        )}
      </DndProvider>
    </div>
  );
}

export default Home;
