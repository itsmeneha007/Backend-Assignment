
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'tasks.json');

export function readTasks() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}
