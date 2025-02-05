const express = require("express")
const Task = require("../models/task")
const User = require("../models/user")
const authenticateToken = require("./auth")

const router = express.Router()
//create task
router.post('/create-task',authenticateToken,async(req,res)=>{
    try {
        const {title,desc} = req.body;
        const {id} = req.headers;
        const newTask = new Task({title:title,desc:desc})
       const saveTask =  await newTask.save()
       const taskId = saveTask._id
        await User.findByIdAndUpdate(id,{ $push:{tasks:taskId._id}})
        res.status(200).json({message:"Task Created"});
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
})

//get all todo
router.get("/get-all-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
       const userData =  await User.findById(id).populate({
        path: "tasks",
        options: {sort: {createdAt: -1}}
    });
       res.status(200).json({data: userData});

    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

//delete
router.delete("/delete-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.params;
        const userId = req.headers.id
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{ $pull: {tasks:id}})
        res.status(200).json({message:"Task Deleted Successfully"});
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});   
    }
})

//update
router.put("/update-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.params;
        const {title ,desc} = req.body;
        await Task.findByIdAndUpdate(id,{title:title,desc:desc})
       
        res.status(200).json({message:"Task Updated Successfully"});
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});   
    }
})

//update important todo
router.put("/update-imp-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id)
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id,{important: !ImpTask})
        res.status(200).json({message:"Task marked Important Successfully"});
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});   
    }
})

//updtate complete todo
router.put("/update-complete-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id)
        const CompletedTask = TaskData.completed;
        await Task.findByIdAndUpdate(id,{completed: !CompletedTask})
        res.status(200).json({message:"Task Completed Successfully"});
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});   
    }
})


//get important task
router.get("/get-imp-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
       const Data =  await User.findById(id).populate({
        path: "tasks",
        match: { important: true },
        options: {sort: {createdAt: -1}}
    });
    const ImpTaskData = Data.tasks;
       res.status(200).json({data: ImpTaskData});
        
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

//get complete task
router.get("/get-complete-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
       const Data =  await User.findById(id).populate({
        path: "tasks",
        match: { completed: true },
        options: {sort: {createdAt: -1}}
    });
    const compTaskData = Data.tasks;
       res.status(200).json({data: compTaskData});
        
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

//get incomplete task
router.get("/get-incomplete-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
       const Data =  await User.findById(id).populate({
        path: "tasks",
        match: { completed: false },
        options: {sort: {createdAt: -1}}
    });
    const compTaskData = Data.tasks;
       res.status(200).json({data: compTaskData});
        
    } catch (error) {
        console.log("error in creating task",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports = router;

