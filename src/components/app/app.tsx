import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Feed from "../../pages/feed/feed";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import Orders from "../orders/orders";
import OrderFullDetails from "../order-full-details/order-full-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import ProfileInformation from "../profile-information/profile-information";

import { loadIngredients } from "../../services/ingredients/actions";
// import { closeIngredient } from "../../services/ingredient/reducer";
import { checkUserAuth } from "../../services/user/actions";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import {
  FEED,
  FORGOT_PASSWORD,
  HOME,
  INGREDIENTS,
  INGREDIENT_ID,
  LOGIN,
  ORDERS,
  PROFILE,
  REGISTER,
  RESET_PASSWORD,
  LIVE_ORDER_SERVER_URL,
  LIVE_ORDERS_SERVER_URL,
  NUMBER,
} from "../../utils/constants";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

import {
  connect as liveOrderConnect,
  disconnect as liveOrderDisconnect,
} from "../../services/live-user-orders/actions";

import {
  connect as liveOrdersConnect,
  disconnect as liveOrdersDisconnect,
} from "../../services/live-all-orders/actions";

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;

  const handleOnClose = () => {
    navigate(-1);
    // dispatch(closeIngredient());
  };

  const isIngredientsLoading = useAppSelector(
    (state) => state.ingredients.loading
  );
  const isOrderLoading = useAppSelector((state) => state.order.loading);
  //@ts-ignore
  const isUserLoading = useSelector((store) => store.user.loading);
  const isLoading = isIngredientsLoading || isOrderLoading || isUserLoading;

  const ordersInfo = useAppSelector((state) => state.liveuserorder.live_user_orders);

  const confirmationPasswordReset = localStorage.getItem(
    "confirmationPasswordReset"
  )
    ? true
    : false;

  // const currentUrl = window.location.pathname.split("/").pop();

  // const orderSocketInfo = useAppSelector((state) => state.liveuserorder.status);
  // const ordersSocketInfo = useAppSelector((state) => state.liveallorders.status);

  // if (currentUrl === "orders" && orderSocketInfo === "OFFLINE") {
  //   dispatch(liveOrderConnect(LIVE_ORDER_SERVER_URL));
  // } else if (currentUrl !== "orders" && orderSocketInfo === "ONLINE") {
  //   dispatch(liveOrderDisconnect());
  // } else if (currentUrl === "feed" && ordersSocketInfo === "OFFLINE") {
  //   dispatch(liveOrdersConnect(LIVE_ORDERS_SERVER_URL));
  // } else if (currentUrl !== "feed" && ordersSocketInfo === "ONLINE") {
  //   dispatch(liveOrdersDisconnect());
  // }

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const currentUrl = window.location.pathname.split("/").pop();

  const orderSocketInfo = useAppSelector((state) => state.liveuserorder.status);
  const ordersSocketInfo = useAppSelector((state) => state.liveallorders.status);

  useEffect(() => {
    if ((currentUrl !== "orders" && orderSocketInfo === "ONLINE")) {dispatch(liveOrderDisconnect())};
    if ((currentUrl !== "feed" && ordersSocketInfo === "ONLINE")) {dispatch(liveOrdersDisconnect())};
  }, [currentUrl])

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && (
        <Modal isLoading={isLoading}>
          <Preloader />
        </Modal>
      )}

      <Routes location={state?.backgroundLocation || location}>
        <Route path={HOME} element={<Home />} />
        <Route path={FEED} element={<Feed />} />
        <Route path={LOGIN} element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path={REGISTER}
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route path={PROFILE} element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<ProfileInformation />} />
          <Route
            path={`${PROFILE}${ORDERS}`}
            element={
              <Orders path={`${PROFILE}${ORDERS}`} ordersInfo={ordersInfo} />
            }
          />
        </Route>
        <Route
          path={FORGOT_PASSWORD}
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path={RESET_PASSWORD}
          element={
            confirmationPasswordReset ? (
              <OnlyUnAuth component={<ResetPassword />} />
            ) : (
              <Navigate to={FORGOT_PASSWORD} replace />
            )
          }
        />

        <Route
          path={`${INGREDIENTS}${INGREDIENT_ID}`}
          element={<IngredientDetails />}
        />
        <Route path={`${FEED}${NUMBER}`} element={<OrderFullDetails />} />
        <Route path={`${PROFILE}${ORDERS}${NUMBER}`} element={<OrderFullDetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={`${INGREDIENTS}${INGREDIENT_ID}`}
            element={
              <Modal handleOnClose={handleOnClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={`${FEED}${NUMBER}`}
            element={
              <Modal handleOnClose={handleOnClose}>
                <OrderFullDetails />
              </Modal>
            }
          />
          <Route
            path={`${PROFILE}${ORDERS}${NUMBER}`}
            element={
              <Modal handleOnClose={handleOnClose}>
                <OrderFullDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
