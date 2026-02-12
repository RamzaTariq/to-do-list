//Get DOM elements 
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const loadBtn = document.getElementById("loadBtn");
const list = document.getElementById("list");

//Add task 
function addTask() {
    const taskName = taskInput.value.trim();
    if (!taskName) return alert("Please enter a task");

    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now(), name: taskName })
    })
    .then(() => {
        taskInput.value = "";
        loadTasks();
    });
}

//Load tasks 
function loadTasks() {
    fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(tasks => {        
            list.innerHTML = tasks.map((task, index) => {
                return`
                    <li>
                        ${index = 1}. <span id="task-${task.id}">${task.name}</span>
                        <button onclick="editTask(${task.id})">Update</button>
                        <button onclick+"deleteTask(${task.id})">Delete</button>
                    </li>
                `;
            }).join("");
        });
}

//Delete task
function deleteTask(id) {
    fetch(`http://localhost:3000/task/${id}`, { method: "DELETE"})
    .then(() => loadTasks());
}

//Update task 
function editTask(id) {
    const currentName = document.getElementById(`task-${id}`).innerText;
    const newName = promt("Update task:", currentName);
    if (!newName) return;

    fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName })
    })
    .then(() => loadTasks());
}

//Event listeners
addBtn.addEventListener("click", addTask);
loadBtn.addEventListener("click", loadTasks);

//Auto-load tasks when page opens
loadTasks();