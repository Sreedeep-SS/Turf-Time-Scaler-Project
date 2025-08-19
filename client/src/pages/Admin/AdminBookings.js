import React, { useEffect, useState } from "react";
import { Table, Spin, Select, DatePicker, Typography, Button } from "antd";
import { GetAdminBookings } from "../../apicalls/bookings";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs"

const { Title } = Typography;
const { Option } = Select;

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const turfId = params.get("turfId");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await GetAdminBookings({
        turfId,
        status: filters.status,
        date: filters.date,
      });
      if (response.success) {
        setBookings(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [turfId, filters]);

  const resetFilters = () => {
    setFilters({});
  };

  const columns = [
    {
      title: "Turf",
      dataIndex: ["venue", "name"],
      key: "turf",
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Start",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => new Date(text).toLocaleTimeString(),
    },
    {
      title: "End",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => new Date(text).toLocaleTimeString(),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>All Bookings</Title>

    {/* Filters */}
    <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
    <Select
        placeholder="Filter by Payment Status"
        style={{ width: 200, height: 40 }}
        value={filters.status || undefined}
        onChange={(val) => setFilters((prev) => ({ ...prev, status: val }))}
        allowClear
    >
        <Option value="pending">Pending</Option>
        <Option value="paid">Paid</Option>
        <Option value="cancelled">Cancelled</Option>
        <Option value="failed">Failed</Option>
    </Select>

    <DatePicker
        style={{ height: 45 }}
        value={filters.date ? dayjs(filters.date) : null}
        onChange={(date, dateString) =>
            setFilters((prev) => ({ ...prev, date: dateString }))
        }
    />

    <Button
        style={{ height: 40 }}
        type="default"
        onClick={resetFilters}
    >
        Reset Filters
    </Button>
    </div>

      {loading ? (
        <Spin />
      ) : (
        <Table
          rowKey="_id"
          dataSource={bookings}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}

export default AdminBookings;