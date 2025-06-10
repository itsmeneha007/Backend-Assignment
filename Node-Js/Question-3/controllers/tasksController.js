const { readJSON, writeJSON } = require('../utils/fileUtils');
const { isValidTitle, isValidDate } = require('../utils/validate');
const tasksFile = './data/tasks.json';

function loadTasks() {
  return readJSON(tasksFile);
}

function saveTasks(tasks) {
  writeJSON(tasksFile, tasks);
}

function addTask(title, dueDate) {
  if (!isValidTitle(title)) {
    return console.log('❌ Invalid title.');
  }
  if (!isValidDate(dueDate)) {
    return console.log('❌ Invalid date format. Use YYYY-MM-DD.');
  }

  const tasks = loadTasks();
  const newTask = { id: Date.now(), title, dueDate, completed: false };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log('✅ Task added.');
}

function listTasks(filter = 'all') {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return console.log('No tasks found.');
  }

  filteredTasks.forEach(task => {
    console.log(
      `ID: ${task.id} | ${task.completed ? '✔️' : '❌'} | ${task.title} | Due: ${task.dueDate}`
    );
  });
}

function deleteTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) return console.log('❌ Task ID not found.');

  tasks.splice(index, 1);
  saveTasks(tasks);
  console.log('✅ Task deleted.');
}

function toggleComplete(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id == id);
  if (!task) return console.log('❌ Task ID not found.');

  task.completed = !task.completed;
  saveTasks(tasks);
  console.log(`✅ Task marked as ${task.completed ? 'completed' : 'pending'}.`);
}

module.exports = { addTask, listTasks, deleteTask, toggleComplete };
