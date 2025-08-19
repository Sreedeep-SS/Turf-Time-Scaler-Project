import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { GetAdminTurfs } from "../../apicalls/turf";
import { useSelector } from "react-redux";

const { Title } = Typography;

function Venues() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // admin user from redux

  const fetchTurfs = async () => {
    try {
      setLoading(true);
      const response = await GetAdminTurfs(user._id);
      if (response.success) {
        setTurfs(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchTurfs();
  }, [user]);

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>My Turfs</Title>
      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {turfs.map((turf) => (
            <Col xs={24} sm={12} md={8} key={turf._id}>
              <Card
                hoverable
                title={turf.name}
                extra={
                  <a onClick={() => navigate(`/admin/bookings?turfId=${turf._id}`)}>
                    View Bookings
                  </a>
                }
              >
                <p>{turf.location}</p>
                <p>₹{turf.price} / hour</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Venues;