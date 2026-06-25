const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

function addTask() {

    if(taskInput.value.trim() === ""){
        alert("Enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div>
                <strong>${task.text}</strong>
                <div class="priority">
                    Priority: ${task.priority}
                </div>
            </div>

            <div class="task-buttons">

                <button
                class="complete"
                onclick="toggleTask(${task.id})">
                ✓
                </button>

                <button
                class="delete"
                onclick="deleteTask(${task.id})">
                ✕
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
function updateStats(){

    const total = tasks.length;
    const completed =
        tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("pending").textContent = pending;
}