import React, { useEffect, useState } from "react";
import Card from "../components/home/Card";
import axios from "axios";

const ImportantTask = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://task-management-backend-gwin.onrender.com/api/v2/get-imp-tasks",
        {
          headers,
        }
      );
      setData(response.data.data);
    };
    fetch();
  });
  return (
    <div>
      <Card home={" false"} data={Data} />
    </div>
  );
};

export default ImportantTask;
