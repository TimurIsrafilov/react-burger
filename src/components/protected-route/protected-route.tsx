import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";

import { LOGIN } from "../../utils/constants";

type TypeProtectedComponentData = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TypeProtectedComponentData): React.JSX.Element => {
  // @ts-ignore
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  // @ts-ignore
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  // @ts-ignore
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

export const OnlyUnAuth = ({ component }: TypeProtectedComponentData) => (
  <Protected onlyUnAuth={true} component={component} />
);
