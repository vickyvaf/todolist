import { Skeleton, Space } from "antd";
import { FC } from "react";

const SkeletonList: FC = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Skeleton.Button
        active={true}
        size={"default"}
        shape={"square"}
        block={true}
      />
      <Skeleton.Button
        active={true}
        size={"default"}
        shape={"square"}
        block={true}
      />
      <Skeleton.Button
        active={true}
        size={"default"}
        shape={"square"}
        block={true}
      />
    </Space>
  );
};

export default SkeletonList;
