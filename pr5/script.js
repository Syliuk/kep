let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function formatDate(date) {
    const d = date.getDate().toString().padStart(2,'0');
    const m = (date.getMonth()+1).toString().padStart(2,'0');
    const y = date.getFullYear().toString().slice(-2);
    const h = date.getHours().toString().padStart(2,'0');
    const min = date.getMinutes().toString().padStart(2,'0');
    return `${d}.${m}.${y}, ${h}:${min}`;
}

function renderTasks() {
    const ul = document.getElementById('taskList');
    ul.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if(task.completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        if(task.completed) checkbox.style.display = 'none';
        checkbox.addEventListener('change', () => {
            task.completed = true;
            saveTasks();
            renderTasks();
        });

        const spanText = document.createElement('span');
        spanText.className = 'task-text';
        spanText.textContent = task.text;
        spanText.addEventListener('dblclick', () => editTask(index, spanText));

        const spanDate = document.createElement('span');
        spanDate.className = 'date';
        spanDate.textContent = task.date;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = '✖';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(spanText);
        li.appendChild(spanDate);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

function editTask(index, spanElement) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = tasks[index].text;
    spanElement.replaceWith(input);
    input.focus();
    input.addEventListener('keydown', e => {
        if(e.key === 'Enter'){
            tasks[index].text = input.value;
            saveTasks();
            renderTasks();
        }
    });
}

document.getElementById('newTask').addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        const text = e.target.value.trim();
        if(text){
            const task = {
                text: text,
                date: formatDate(new Date()),
                completed: false
            };
            tasks.push(task);
            saveTasks();
            renderTasks();
            e.target.value = '';
        }
    }
});

function sortTasks() {
    tasks.sort((a,b) => a.completed - b.completed);
    saveTasks();
    renderTasks();
}

renderTasks();