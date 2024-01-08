import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import Modal from "../components/modal/modal";
import Preloader from "../components/preloader/preloader";

import { LOGIN } from "./constants";

const Protected = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  const isUserLoading = useSelector((store) => store.user.loading);

  if (!isAuthChecked) {
    return (
      <Modal isLoading={!isUserLoading}>
        <Preloader />
      </Modal>
    );
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={LOGIN} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
