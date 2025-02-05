import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

const InputData = ({ inputDiv, setInputDiv, UpdateData, setUpdateData }) => {
  const [Data, setData] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    setData({ title: UpdateData.title, desc: UpdateData.desc });
  }, [UpdateData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post("http://localhost:1000/api/v2/create-task", Data, {
        headers,
      });
      setData({
        title: "",
        desc: "",
      });
      setInputDiv("hidden");
    }
  };

  const UpdateTask = async()=>{
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      const id = UpdateData.id;
      console.log("updatedata id",id);
      
      await axios.put(`http://localhost:1000/api/v2/update-task/${UpdateData.id}`, Data, {
        headers,
      });
      setUpdateData({
        id: "",
        title: "",
        desc: "",
      });
      setData({
        title: "",
        desc: "",
      });
      setInputDiv("hidden");
    }
  }

  return (
    <>
      <div
        className={` ${inputDiv}  top-0 left-0 bg-gray-800 opacity-70 h-screen w-full`}
      ></div>
      <div
        className={` ${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className=" w-2/6 bg-gray-900  p-4 rounded-sm">
          <div className=" flex justify-end my-2">
            <button
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  desc: "",
                });
                setUpdateData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
              className="text-xl "
            >
              <ImCross />
            </button>
          </div>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 "
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Enter Your ToDo"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          />
          {UpdateData.id===""?<button
            className=" px-3 py-2 bg-blue-400 rounded text-black text-xl"
            onClick={submitData}
          >
            Submit
          </button>: <button
            className=" px-3 py-2 bg-blue-400 rounded text-black text-xl"
            onClick={UpdateTask}
          >
            Update
          </button>}
         
          
        </div>
      </div>
    </>
  );
};

export default InputData;
