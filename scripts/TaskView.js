export class TaskView {
    constructor(todoRoot,doneRoot) {
        this._todoRoot = todoRoot
        this._doneRoot = doneRoot
    }

    template(tasks) {
        return tasks.reduce((taskList,task) =>{
            
            let key = 'done'
            let icon = `
                <button class="done-btn" onclick="controller.toggleTask(${task.id})">
                    <span class="material-icons">check_circle</span>
                </button>
            `

            if(task.status === 'todo') {
                key = 'todo'
                icon = `
                    <button class="do-btn" onclick="controller.toggleTask(${task.id})">
                    </button>
                `
            }

            

            taskList[key]+= `
            <div class="task" id="${task.id}">
                ${icon}
                <p class="title">
                    ${task.name}
                </p>
                <div class="options">
                    <button class="edit-btn" onclick="controller.edit(${task.id})">
                        <span class="material-icons">
                            edit
                        </span>
                    </button>
            
                    <button class="delete-btn" onclick="controller.delete(${task.id})">
                        <span class="material-icons">
                            delete
                        </span>
                    </button>
                </div>       
            </div>
            
            `
            return taskList
        },{todo:'',done:''})
    }

    update(tasks) {
        let mountedHTML = this.template(tasks)
        this._todoRoot.innerHTML = mountedHTML.todo;
        this._doneRoot.innerHTML = mountedHTML.done;
    }
}