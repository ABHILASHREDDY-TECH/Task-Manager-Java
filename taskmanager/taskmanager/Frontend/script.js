const API_URL = "http://localhost:8080/tasks";

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.title}
            </span>
            <div>
                <button onclick="toggleTask(${task.id})">Done</button>
                <button onclick="editTask(${task.id}, '${task.title}')">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (title === "") {
        alert("Task title cannot be empty");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title })
    });

    input.value = "";
    loadTasks();
}

async function editTask(id, oldTitle) {
    const newTitle = prompt("Edit task title", oldTitle);

    if (newTitle === null || newTitle.trim() === "") {
        alert("Task title cannot be empty");
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: newTitle })
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

async function toggleTask(id) {
    await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH"
    });

    loadTasks();
}

loadTasks();