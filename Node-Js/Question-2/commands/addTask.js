import { readTasks, writeTasks } from "../utils/fileHandler.js";

export function addTask(title, dueDate){
    if (!title || !dueDate)
        return console.log('❌ Title and due date are required')

    const tasks = readTasks();
    const newTask = {id: Date.now(), title, dueDate, status: 'pending'}
    tasks.push(newTask)
    writeTasks(tasks)
    console.log(`✅ Task "${title}" added.`)
}
