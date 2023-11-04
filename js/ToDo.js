export class ToDo{
    constructor(_txtTodo, _status, _deadline){
        this.textTodo = _txtTodo;
        this.status = _status; // uncompleted, completed
        this.deadline = _deadline;
    }
}