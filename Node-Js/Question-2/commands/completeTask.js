import { readTasks, writeTasks } from "../utils/fileHandler.js";

export function completeTask(identifier) {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id.toString() === identifier || t.title === identifier);
    
    if (index === -1) {
        return console.log('❌ Task Not Found');
    }
    
    tasks[index].status = 'completed';
    writeTasks(tasks);  
    
    console.log(`✅ Task "${tasks[index].title}" marked as completed`);
}
