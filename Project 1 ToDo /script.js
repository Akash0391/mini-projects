document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTasks(task));

    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

    tasks.push(newTask);
        saveTasks();
        renderTasks(newTask);
        todoInput.value = "";  //clear input
        console.log(tasks);   localStorage.setItem('tasks', JSON.stringify(tasks));

    })

    function renderTasks(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>`;
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        })

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); //prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        })

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})