import { TaskController } from "./TaskController.js";

window.controller = new TaskController(
    document.querySelector('.add-box input'),
    document.querySelector('.tasks-todo .tasks'),
    document.querySelector('.tasks-done .tasks'))