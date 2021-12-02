import {Task} from './Task.js'
import {TaskView} from './TaskView.js'

export class TaskController {
    constructor(input,todo,done){
        this.input = input
        this.taskView = new TaskView(todo,done)
        this.taskList = []
        this._addTrigger()
        this.create()
    }

    _addTrigger(){
        this.input.addEventListener('keyup',e => {
            if(e.key === 'Enter'){
                const name = this.input.value
                if(/\w/.test(name)){
                    this.taskList.push(new Task(name))
                    this.create()
                }
            }
        })
    }

    create(){
        this.taskView.update(this.taskList)
        this.input.value = ''
    }
    
    getElementByID(id){
        return this.taskList.find(task => task.id === id)
    }

    toggleTaskEnum(task){
        if(task.status === 'todo') return 'done'
        return 'todo'
    }

    delete(id){
        let taskPosition = this.taskList.indexOf(this.getElementByID(id))
        this.taskList.splice(taskPosition,1)
        this.taskView.update(this.taskList)
    }
    
    toggleTask(id){
        this.taskList.map(task =>{
            if(task.id === id) {
                task.status = this.toggleTaskEnum(task)
            }
            return task
        })
        this.taskView.update(this.taskList)
    }

    edit(id){
        const element = this.getElementByID(id) 
        element.name = prompt("Novo nome") || element.name
        this.create()
    }
}