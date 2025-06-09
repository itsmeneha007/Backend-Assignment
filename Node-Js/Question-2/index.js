import readline from 'readline';
import { addTask } from './commands/addTask.js';
import { listTasks } from './commands/listTasks.js';
import { completeTask } from './commands/completeTask.js';
import { updateTask } from './commands/updateTask.js';
import { deleteTask } from './commands/deleteTask.js';
import { searchTasks } from './commands/searchTasks.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log('\n📋 Welcome to Task Manager');
console.log('Type "help" to see available commands.');

function showHelp() {
  console.log(`\n📘 Commands:
  add-task <title> <dueDate>
  list-tasks
  complete-task <title|id>
  update-task <title|id> [newTitle] [newDueDate]
  delete-task <title|id>
  search-tasks <query>
  help
  exit`);
}

function prompt() {
  rl.question('\n> ', input => {
    const [command, ...args] = input.trim().split(' ');
    switch (command) {
      case 'add-task': addTask(args[0], args[1]); break;
      case 'list-tasks': listTasks(); break;
      case 'complete-task': completeTask(args.join(' ')); break;
      case 'update-task': updateTask(args[0], args[1], args[2]); break;
      case 'delete-task': deleteTask(args.join(' ')); break;
      case 'search-tasks': searchTasks(args.join(' ')); break;
      case 'help': showHelp(); break;
      case 'exit': rl.close(); return;
      default: console.log('❓ Unknown command. Type "help" for list.');
    }
    prompt();
  });
}

prompt();