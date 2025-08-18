import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GetAllVenues } from "../apicalls/turf"

const { Title, Text } = Typography;

function Home() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await GetAllVenues();
      console.log("Response",response.data)
      if (response.success) {
        setVenues(response.data);
      }
    } catch (error) {
      console.error("Error fetching venues", error);
    } finally {
      setLoading(false);
      console.log("Venues",venues)
    }
  };
  
  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <div style={{ backgroundColor: "rgba(231, 231, 231, 1)", padding: "24px", minHeight: "150vh"}}>
      <Title level={2}>Exciting Venues For You</Title>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {venues.map((venue) => (
            <Col xs={24} sm={12} md={8} key={venue._id}>
              <Card
                  hoverable
                  style={{ height: "100%" }}
                  cover={
                    <img
                      alt={venue.name}
                      src={venue.image || "https://via.placeholder.com/300"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  }
                >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Content Section */}
                  <div style={{ flexGrow: 1 }}>
                    <h3>{venue.name}</h3>
                    <p>{venue.location || "Location not specified"}</p>
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      ₹{venue.price} / hour
                    </p>
                  </div>

                  {/* Button Section (sticks to bottom) */}
                  <div style={{ marginTop: "auto" }}>
                    <Button
                      type="default"
                      color = "geekblue"
                      variant = "filled"
                      block
                      onClick={() => navigate(`/venue/${venue._id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
