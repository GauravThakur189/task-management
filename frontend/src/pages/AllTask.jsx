import React, { useEffect, useState } from "react";
import Card from "../components/home/Card";
import { IoMdAddCircleOutline } from "react-icons/io";
import InputData from "../components/home/InputData";
import axios from "axios";
import { data } from "react-router-dom";
const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdateData, setUpdateData] = useState({
    id:"",
    title:"",
    desc:"",
  })
  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://task-management-backend-gwin.onrender.com/api/v2/get-all-tasks",
        {
          headers,
        }
      );
     // console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  });
  

  return (
    <>
      <div>
        <div className=" w-full flex items-end p-4">
          <button onClick={() => setInputDiv("fixed")}>
            <IoMdAddCircleOutline className=" text-2xl text-gray-400" />
          </button>
        </div>
      {Data &&  <Card home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdateData = {setUpdateData} />}
      </div>
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} UpdateData={UpdateData} setUpdateData={setUpdateData} />
    </>
  );
};

export default AllTask;
