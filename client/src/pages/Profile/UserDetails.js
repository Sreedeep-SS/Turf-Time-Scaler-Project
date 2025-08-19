import React from "react";
import { useSelector } from "react-redux";
import { Card, Descriptions, Tag } from "antd";

function UserDetails() {
  const { user } = useSelector((state) => state.user);

  if (!user) return <p>No user data found</p>;

  return (
    <Card title="User Details" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Member Since">
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

export default UserDetails;
