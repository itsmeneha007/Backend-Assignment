const readline = require('readline');
const {
  addTask,
  listTasks,
  deleteTask,
  toggleComplete
} = require('./controllers/tasksController');
const { setPreference, getPreferences } = require('./controllers/preferencesController');

const rl = readline.createInterface({
  input: process.stdin,
  outSput: process.stdout,
  prompt: 'TaskManager> '
});

console.log('📋 Welcome to Task Manager CLI');
rl.prompt();

rl.on('line', line => {
  const [cmd, ...args] = line.trim().split(' ');
  const preferences = getPreferences();

  switch (cmd) {
    case 'add-task':
      addTask(args[0], args[1]);
      break;
    case 'list-tasks':
      listTasks(preferences.filter);
      break;
    case 'delete-task':
      deleteTask(args[0]);
      break;
    case 'toggle-task':
      toggleComplete(args[0]);
      break;
    case 'set-preference':
      setPreference(args[0], args[1]);
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log('❌ Unknown command.');
  }
  rl.prompt();
});

rl.on('close', () => {
  console.log('👋 Goodbye!');
  process.exit(0);
});
