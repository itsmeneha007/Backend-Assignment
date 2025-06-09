import { readTasks } from "../utils/fileHandler.js";

export function listTasks() {
    const tasks = readTasks();

    if (tasks.length === 0) {
        console.log('No task found');
        return;
    }

    console.log('Task List:\n');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. [${task.status === 'completed' ? '✅' : ' '}] "${task.title}" - Due: ${task.dueDate} (ID: ${task.id})`);
    });
}
