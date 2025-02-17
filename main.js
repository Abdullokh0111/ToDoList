const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const todoList = document.getElementById('todoList');
const successMessage = document.getElementById('successMessage');

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
  });
};


const saveTasks = () => {
  const tasks = [];
  document.querySelectorAll('.todo-item').forEach(item => {
    tasks.push({
      text: item.querySelector('.task').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTaskToDOM = (taskText, completed = false) => {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';
  if (completed) listItem.classList.add('completed');
  listItem.innerHTML = `
    <span class="task">${taskText}</span>
    <div class="actions">
      <button class="edit">✏️</button>
      <button class="delete">🗑️</button>
    </div>
  `;

  todoList.appendChild(listItem);

  const editButton = listItem.querySelector('.edit');
  const deleteButton = listItem.querySelector('.delete');

  editButton.addEventListener('click', () => {
    const newTask = prompt('Edit your task:', listItem.querySelector('.task').textContent);
    if (newTask) {
      listItem.querySelector('.task').textContent = newTask;
      saveTasks();
    }
  });

  deleteButton.addEventListener('click', () => {
    listItem.remove();
    saveTasks();
  });

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
    saveTasks();
  });
};

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  addTaskToDOM(taskText);
  taskInput.value = '';

  successMessage.style.display = 'block';
  setTimeout(() => successMessage.style.display = 'none', 2000);

  saveTasks();
});

loadTasks();