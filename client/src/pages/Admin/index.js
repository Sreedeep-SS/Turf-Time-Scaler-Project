import React from "react";
import { Tabs } from "antd";
import Venues from "./Venues";
import AdminBookings from "./AdminBookings";

const { TabPane } = Tabs;

function Admin() {
  return (
    <div style={{ padding: "24px" }}>
      <h2>Admin Dashboard</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="My Venues" key="1">
          <Venues />
        </TabPane>
        <TabPane tab="All Bookings" key="2">
          <AdminBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
