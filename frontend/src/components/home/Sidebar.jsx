import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    {
      title: "All Todo",
      link: "/",
    },
    {
      title: "Important Todo",
      link: "/importantTasks",
    },
    {
      title: "Completed Todo",
      link: "/completedTasks",
    },
    {
      title: "Incompleted Todo",
      link: "/inCompletedTasks",
    },
  ];
  const [Data, setData] = useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        {
          headers,
        }
      );
      console.log(response.data.data.tasks);
      setData(response.data.data)
    };
    fetch();
  }, []);

  return (
    <>
      {Data && (
        <div>
          <h2 className=" text-xl font-semibold">{Data.username}</h2>
          <h4 className=" mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div className=" flex flex-col">
        {data.map((data, id) => (
          <Link
            to={data.link}
            key={id}
            className=" m-2 hover:bg-gray-700 p-2 rounded-lg"
          >
            {data.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          className=" bg-gray-600 w-full hover:bg-blue-700 text-white font-bold py-2 rounded-2xl"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
