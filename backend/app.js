const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 1000;
const cors = require("cors")
const UserApi = require('./routes/user')
const TaskApi = require("./routes/task")
// const AiApi = require("./routes/ai");
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://rajanthakur1818:DM7RjaY3XE9Yw2ib@cluster0.nff1w.mongodb.net/todo_app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// app.use("/",(req,res)=>{
//     res.send("Hello World");
// })
//localhost:3000/api/v1.sign-in
app.use('/api/v1',UserApi)
app.use('/api/v1',UserApi)
app.use('/api/v2',TaskApi)
// app.use('/api/v3',AiApi)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})