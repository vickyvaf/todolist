import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Space, Typography } from "antd";

const { Text } = Typography;

const Register: FC = () => {
  const [isTextValidate, setIsTextValidate] = useState<boolean>(false);

  return (
    <div className="login-container">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          status={isTextValidate ? "error" : ""}
          placeholder="Name"
          type="text"
        />
        <Input
          status={isTextValidate ? "error" : ""}
          placeholder="Username"
          type="text"
        />
        <Input
          status={isTextValidate ? "error" : ""}
          placeholder="Email"
          type="email"
        />
        <Input
          status={isTextValidate ? "error" : ""}
          placeholder="Password"
          type="password"
        />
        <Button type="primary" style={{ width: "100%" }}>
          Register
        </Button>
        <Text>Sudah punya akun? <Link to="/login">Login</Link></Text>
      </Space>
    </div>
  );
};

export default Register;
