import { readTasks } from "../utils/fileHandler.js";

export function listTasks(){
    const tasks = readTasks()
    if(!tasks.length)
        return console.log('No tasks found')

    tasks.forEach((t, i) => {
        const statusIcon = t.status === 'completed' ? '✅' : '🕧';
        console.log(`${i+1}. [${statusIcon}] "${t.title}" - Due: ${t.dueDate} (ID: ${t.id})`)
    })
}