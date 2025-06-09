import { readTasks, writeTasks } from "../utils/fileHandler.js";

export function addTask(title, dueDate){
    if (!title || !dueDate){
        console.log('Error: ❌Task title and due date are required')
        return;
    }

    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        title,
        dueDate,
        status:'pending'
    }

    tasks.push(newTask);
    writeTasks(tasks)

    console.log(`Task "${title}" added with due date ${dueDate}.` )
}