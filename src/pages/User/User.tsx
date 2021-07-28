import React from "react";
import { useParams } from "react-router-dom";

const UserManagement = () => {
  const { userId }: any = useParams();
  return <h1>{userId}</h1>;
};

export default UserManagement;
