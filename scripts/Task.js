import {uniqID} from './uniqId.js'

export class Task {

    constructor(name, status = 'todo') {
        this.name = name
        this.id = uniqID.generate()
        this.status = status
    }
}
