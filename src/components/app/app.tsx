import { useEffect } from "react";
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
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound404 from "../../pages/not-found-404/not-found-404";

import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import ProfileInformation from "../profile-information/profile-information";

import { loadIngredients } from "../../services/ingredients/actions";
import { closeIngredient } from "../../services/ingredient/reducer";
import { checkUserAuth } from "../../services/user/actions";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import {
  FORGOT_PASSWORD,
  HOME,
  INGREDIENTS_INGREDIENT_ID,
  LOGIN,
  PROFILE,
  PROFILE_ORDERS,
  REGISTER,
  RESET_PASSWORD,
} from "../../utils/constants";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;

  const handleOnClose = () => {
    navigate(-1);
    dispatch(closeIngredient());
  };

  const isIngredientsLoading = useAppSelector(
    (state) => state.ingredients.loading
  );
  const isOrderLoading = useAppSelector((state) => state.order.loading);
  //@ts-ignore
  const isUserLoading = useSelector((store) => store.user.loading);
  const isLoading = isIngredientsLoading || isOrderLoading || isUserLoading;

  const confirmationPasswordReset = localStorage.getItem(
    "confirmationPasswordReset"
  )
    ? true
    : false;

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
        <Route path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path={REGISTER}
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route path={PROFILE} element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<ProfileInformation />} />
          <Route path={PROFILE_ORDERS} element={<NotFound404 />} />
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
        <Route path={PROFILE} element={<OnlyAuth component={<Profile />} />} />
        <Route
          path={INGREDIENTS_INGREDIENT_ID}
          element={<IngredientDetails />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={INGREDIENTS_INGREDIENT_ID}
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
