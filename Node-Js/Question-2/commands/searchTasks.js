import { readTasks } from '../utils/fileHandler.js';

export function searchTasks(query) {
  const tasks = readTasks();
  const matches = tasks.filter(t => t.title.includes(query) || t.dueDate.includes(query));
  if (!matches.length) return console.log('🔍 No matching tasks found.');
  matches.forEach((t, i) => {
    const statusIcon = t.status === 'completed' ? '✅' : '🕒';
    console.log(`${i + 1}. [${statusIcon}] "${t.title}" - Due: ${t.dueDate} (ID: ${t.id})`);
  });
}