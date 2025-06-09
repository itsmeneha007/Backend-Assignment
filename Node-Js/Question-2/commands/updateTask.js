import { readTasks, writeTasks } from "../utils/fileHandler.js";

export function updateTask(identifier, newTitle, newDueDate){
    const tasks = readTasks()
    const task = tasks.find(t => t.id.toString() === identifier || t.title === identifier)
    if (!task) 
        return console.log('❌ Task not found')
    
    if (newTitle) task.title = newTitle;
  if (newDueDate) task.dueDate = newDueDate;

  writeTasks(tasks);
  console.log(`✅ Task updated successfully.`);
}