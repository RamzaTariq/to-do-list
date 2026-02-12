const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let tasks = []; //in memory storage

//GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

//POST new task 
app.post("/tasks", (req, res) => {
    const newTask = req.body;
    tasks.push(newTask); 
    res.status(201).json(newTask);
});


//DELETE task
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(t => t.id != id);
    res.json({ message: "Task deleted" });
});

//Update a task
app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    const task = tasks.find(t => t.id == id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.name = name;
    res.json(task);
});

//Start server
app.listen(3000, () => console.log("API running on port 3000"));
