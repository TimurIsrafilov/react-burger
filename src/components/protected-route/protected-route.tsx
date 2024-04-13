import { Navigate, useLocation } from "react-router-dom";

import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";

import { LOGIN } from "../../utils/constants";
import { useAppSelector } from "../../hooks/hooks";

type TypeProtectedComponentData = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TypeProtectedComponentData): React.JSX.Element => {
  const location = useLocation();

  const user = useAppSelector((state) => state.user.user);
  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);
  const isUserLoading = useAppSelector((state) => state.user.loading);

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

export const OnlyUnAuth = ({ component }: TypeProtectedComponentData) => (
  <Protected onlyUnAuth={true} component={component} />
);
