import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginRoute = (props: any) => {
  if (Cookies.get("blabla") === undefined) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
};

export default LoginRoute;
