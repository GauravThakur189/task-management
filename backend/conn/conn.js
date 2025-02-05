const mongoose = require("mongoose");

const conn = async () => {
  try {
    const response = await mongoose.connect("mongodb+srv://gaurav123:gaurav123@cluster0.b7nm4.mongodb.net/todo");
    if (response) {
      console.log("connected to databse");
    }
  } catch (error) {
    console.log("error in connection", error);
  }
};

conn();
