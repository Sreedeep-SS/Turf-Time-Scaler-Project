import React, { useEffect, useState } from "react";
import { Table, Spin, message, Button, Tabs, Tag, Popconfirm } from "antd";
import { FetchMyBookings } from "../../apicalls/bookings";
import { CancelBooking } from "../../apicalls/bookings"; // you'll implement this API

const { TabPane } = Tabs;

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const response = await FetchMyBookings();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      setLoading(true);
      const response = await CancelBooking(bookingId);
      if (response.success) {
        message.success("Booking cancelled successfully");
        getBookings(); // refresh
      } else {
        message.error(response.message);
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const columns = (isFuture = false) => [
    {
      title: "Venue",
      dataIndex: ["venue", "name"],
      key: "venue",
    },
    {
      title: "Location",
      dataIndex: ["venue", "location"],
      key: "location",
    },
    {
      title: "Price",
      dataIndex: ["venue", "price"],
      key: "price",
      render: (price) => `₹${price}/hr`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Time",
      key: "time",
      render: (record) => {
      const start = new Date(record.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const end = new Date(record.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${start} - ${end}`;
        },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {

        if (!status) {
          return <Tag color="default">UNKNOWN</Tag>;
        }

        let color =
          status === "completed"
            ? "green"
            : status === "cancelled"
            ? "red"
            : status === "refunded"
            ? "orange"
            : "blue"; // pending
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    ...(isFuture
      ? [
          {
            title: "Action",
            key: "action",
            render: (record) =>
              record.status === "pending" ? (
                <Popconfirm
                  title="Are you sure you want to cancel this booking?"
                  onConfirm={() => handleCancel(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Cancel</Button>
                </Popconfirm>
              ) : null,
          },
        ]
      : []),
  ];

  const today = new Date();

  const futureBookings = bookings.filter(
    (b) => new Date(b.date) >= today
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.date) < today
  );

  return (
    <div>
      <h2>My Bookings</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Upcoming Bookings" key="1">
            <Table
              dataSource={futureBookings}
              columns={columns(true)}
              rowKey="_id"
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Past Bookings" key="2">
            <Table
              dataSource={pastBookings}
              columns={columns(false)}
              rowKey="_id"
              pagination={false}
            />
          </TabPane>
        </Tabs>
      )}
    </div>
  );
}

export default Bookings;