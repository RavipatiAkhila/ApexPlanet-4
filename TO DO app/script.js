document.getElementById('addTaskButton').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;

    if (taskTitle && taskDescription && taskDate && taskTime) {
        const task = {
            title: taskTitle,
            description: taskDescription,
            date: taskDate,
            time: taskTime
        };
        appendTask(task);
        saveTask(task);
        clearInputs();
    }
}

function appendTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-header">${task.title}</div>
        <div class="task-info">${task.description}</div>
        <div class="task-info">Date: ${task.date}, Time: ${task.time}</div>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        appendTask(task);
    });
}

function deleteTask(button) {
    const li = button.parentElement;
    const taskTitle = li.querySelector('.task-header').textContent;
    li.remove();
    removeTaskFromStorage(taskTitle);
}

function removeTaskFromStorage(taskTitle) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== taskTitle);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearInputs() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskTime').value = '';
}