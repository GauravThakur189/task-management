import React, { useEffect, useState } from 'react'
import Card from '../components/home/Card'
import axios from 'axios';

const IncompletedTask = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://task-management-backend-gwin.onrender.com/api/v2/get-incomplete-tasks",
        {
          headers,
        }
      );
      setData(response.data.data);
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
    
  });
  return (
    <div>
      <Card home={"false"} data={Data}/>
    </div>
  )
}

export default IncompletedTask