import fs from 'fs'
import path from 'path'

const filePath = path.resolve('data', 'tasks.json')

export function readTasks(){
    if(!fs.existsSync(filePath)) 
        return []

    const data = fs.readFileSync(filePath, 'utf-8')

    return data ? JSON.parse(data) : []
}

export function writeTasks(tasks){
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
}

