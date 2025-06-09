import readline from 'readline';
import { addTask } from './commands/addTask.js';
import { listTasks } from './commands/listTasks.js';
import { completeTask } from './commands/completeTask.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to Task Manager');
console.log('Commands: add-task, list-tasks, complete-task, exit');

function prompt() {
  rl.question('\n> ', input => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
      case 'add-task':
        if (args.length < 2) {
          console.log('Error: Please provide both title and due date.');
          break;
        }
        const dueDate = args[args.length - 1];
        const title = args.slice(0, -1).join(' ');
        addTask(title, dueDate);
        break;
      case 'list-tasks':
        listTasks();
        break;
      case 'complete-task':
        const identifier = args.join(' ');
        completeTask(identifier);
        break;
      case 'exit':
        rl.close();
        return;
      default:
        console.log('Invalid command. Try again.');
    }

    prompt();
  });
}

prompt();
