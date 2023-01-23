import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Space, Typography, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";
import Cookies from "js-cookie";

const { Text } = Typography;

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state: any) => state.loginReducer.username);
  const password = useSelector((state: any) => state.loginReducer.password);
  const tag = useSelector((state: any) => state.loginReducer.tag);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationSuccess = (placement: NotificationPlacement) => {
    api.success({
      message: `Login success`,
      placement,
    });
  };

  const openNotificationError = (placement: NotificationPlacement) => {
    api.error({
      message: `Invalid account`,
      placement,
    });
  };

  const handleLogin = async () => {
    dispatch({ type: "LOGIN" });
    try {
      axios
        .post(process.env.REACT_APP_LOGIN as string, {
          username,
          password,
        })
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS" });
          openNotificationSuccess("top");
          Cookies.set("blabla", res.data.data);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          dispatch({
            type: "LOGIN_ERROR",
            payload: { errorMessage: err?.message },
          });
          openNotificationError("top");
        });
    } catch (error) {
      return;
    }
  };

  return (
    <div className="login-container">
      <Space direction="vertical" style={{ width: "100%" }}>
        {contextHolder}
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            status={tag === "error" ? "error" : ""}
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) =>
              dispatch({
                type: "TYPING_USERNAME",
                payload: { username: e.target.value },
              })
            }
          />
          <Input
            status={tag === "error" ? "error" : ""}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) =>
              dispatch({
                type: "TYPING_PASSWORD",
                payload: { password: e.target.value },
              })
            }
          />
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={handleLogin}
            loading={tag === "loading" ? true : false}
          >
            Login
          </Button>
          <Text>
            Belum punya akun? <Link to="/register">Register</Link>
          </Text>
        </Space>
      </Space>
    </div>
  );
};

export default Login;
