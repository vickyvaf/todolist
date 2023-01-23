import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = (props: any) => {
  if (Cookies.get("blabla") === undefined) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
};

export default ProtectRoute;
