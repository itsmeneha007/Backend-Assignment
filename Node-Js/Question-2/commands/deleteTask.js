import { readTasks, writeTasks } from '../utils/fileHandler.js';

export function deleteTask(identifier) {
  const tasks = readTasks();
  const filtered = tasks.filter(t => t.id.toString() !== identifier && t.title !== identifier);
  if (filtered.length === tasks.length) return console.log('❌ Task not found.');
  writeTasks(filtered);
  console.log(`🗑️ Task deleted.`);
}