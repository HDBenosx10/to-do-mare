//-------Variáveis--------//

const taskList = []
const addBox = document.querySelector('.add-box input')
const todoContainer = document.querySelector('.tasks-todo .tasks')
const doneContainer = document.querySelector('.tasks-done .tasks')
const taskStatusConverter = {
    done: 'todo',
    todo: 'done'
}
let globalId = 0

//-------Funções Task--------//

function addTask(taskName){
    let task = generateTask(taskName)
    taskList.push(task)
    updateView()
}

function deleteTask(id){
    let taskPosition = taskList.indexOf(findTaskById(id))
    taskList.splice(taskPosition,1)
    updateView()
}

function editTask(id){
    const element = findTaskById(id) 
    element.name = prompt("Novo nome") || element.name
    updateView()
}

function updateView(){
    let template = generateTemplate()
    todoContainer.innerHTML = template.todo
    doneContainer.innerHTML = template.done
}

//-------Funções Auxiliares--------//

function generateTask(taskName, status = 'todo'){
    globalId++
    return {
        name: taskName,
        status,
        id : globalId
    }
}

function generateTemplate(){
    let template = {
        todo:'',
        done:''
    }

    for(let task of taskList) {
        let icons = {
            todo: `<button class="do-btn" onclick="toggleTask(${task.id})"></button>`,
            done: `<button class="done-btn" onclick="toggleTask(${task.id})"><span class="material-icons">check_circle</span></button>`
        }
        template[task.status] += `
            <div class="task" id="${task.id}">
                ${icons[task.status]}
                <p class="title">
                    ${task.name}
                </p>
                <div class="options">
                    <button class="edit-btn" onclick="editTask(${task.id})">
                        <span class="material-icons">
                            edit
                        </span>
                    </button>
            
                    <button class="delete-btn" onclick="deleteTask(${task.id})">
                        <span class="material-icons">
                            delete
                        </span>
                    </button>
                </div>       
            </div>
        `
    }
    return template
}

function findTaskById(id){
    return taskList.find(task => task.id === id)
}

function toggleTask(id){
    taskList.map(task =>{
        if(task.id === id) {
            task.status = taskStatusConverter[task.status]
        }
        return task
    })
    updateView(taskList)
}

function startApp(){
    addBox.addEventListener('keyup',e => {
        if(e.key === 'Enter'){
            const name = addBox.value
            if(/\w/.test(name)){
                addTask(name)
                addBox.value = ''
            }
        }
    })
}

//-------Start da Aplicação--------//

window.onload = startApp()