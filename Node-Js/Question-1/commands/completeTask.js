import { readTasks, writeTasks } from "../utils/fileHandler.js";

export function completeTask(identifier) {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(
        task => task.id.toString() === identifier || task.title === identifier
    );

    if (taskIndex === -1) {
        console.log('Task not found');
        return;
    }

    tasks[taskIndex].status = 'completed';
    writeTasks(tasks);

    console.log(`Task "${tasks[taskIndex].title}" marked as completed.`);
}
