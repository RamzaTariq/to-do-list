const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let task = [];

//GET all tasks
app.get("/tasks",(req, res) =>{
    res.json(tasks);
});

//POST new task 
app.post("/tasks",(req, res) => {
    const tasks = req.body;
    res.status(201).json(task);
});

//DELETE task
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(t => t.id != id);
    res.json({message: "Task deleted"});
});

app.listen(3000,() => console.log("API running"));
