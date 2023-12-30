import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound404 from "../../pages/not-found-404/not-found-404";

import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import ProfileInformation from "../../components/profile-information/profile-information";

import { loadIngredients } from "../../services/ingredients/actions";
import { checkUserAuth } from "../../services/user/actions";
import { OnlyAuth, OnlyUnAuth } from "../../utils/protected-route";

function App() {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;

  const handleOnClose = () => {
    navigate(-1);
  };

  const isIngredientsLoading = useSelector(
    (store) => store.ingredients.loading
  );
  const isOrderLoading = useSelector((store) => store.order.loading);
  const isUserLoading = useSelector((store) => store.user.loading);
  const isLoading = isIngredientsLoading || isOrderLoading || isUserLoading;

  const confirmationPasswordReset = localStorage.getItem(
    "confirmationPasswordReset"
  )
    ? true
    : false;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && (
        <Modal isLoading={isLoading}>
          <Preloader />
        </Modal>
      )}

      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<ProfileInformation />} />
          <Route path="/profile/orders" element={<NotFound404 />} />
        </Route>
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={
            confirmationPasswordReset ? (
              <OnlyUnAuth component={<ResetPassword />} />
            ) : (
              <Navigate to="/forgot-password" replace />
            )
          }
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal handleOnClose={handleOnClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
