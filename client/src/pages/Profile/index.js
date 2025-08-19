import React from "react";
import UserDetails from "./UserDetails";
import Bookings from "./Bookings";

function Profile() {
  return (
    <div style={{ padding: "24px" }}>
      <UserDetails />
      <Bookings />
    </div>
  );
}

export default Profile;