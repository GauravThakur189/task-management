import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaArrowTurnUp } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { ImTab } from "react-icons/im";
import { FaHeart } from "react-icons/fa";

const Card = ({ home, setInputDiv, data ,setUpdateData}) => {
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")}`,
  };
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,
        {},
        { headers }
      );
      alert(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };
   const handleUpdate = (id,title,desc)=>{
    setInputDiv("fixed")
    setUpdateData({
      id:id,
      title:title,
      desc:desc
    })
   }

  return (
    <div className=" grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div className=" flex flex-col justify-between bg-gray-800 rounded-lg p-4">
            <div>
              <h3 className=" text-xl font-semibold"> {items.title}</h3>
              <p className=" text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className=" flex gap-5 mt-4 w-full">
              <button
                className={` ${
                  items.completed === false ? "bg-red-400" : " bg-green-600"
                } px-2 py-1 rounded-md`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.completed === true ? "Completed" : "Incomplete"}
              </button>
              <div className=" text-white p-2 w-3/6 text-2xl flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className=" text-red-500" />
                  )}
                </button>
                {home === "false" && <button onClick={()=>handleUpdate(items._id,items.title,items.desc)}>
                  <FaRegEdit />
                </button>}
                
                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className=" flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 hover:scale-105 hover:cursor-pointer translate-all duration-300"
        >
          <IoMdAddCircleOutline className=" text-3xl" />
          <h2 className="text-2xl text-gray-300">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Card;
