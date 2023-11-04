export class ToDoList{
    constructor(){
        this.todoList = [];
    }
    // add a new ToDo item to the list
    addToDoItem(_todo){
        this.todoList.push(_todo);
    }
    renderToDoContent(){
        let content = '';
        content = this.todoList.reduceRight((content, item, index) =>{  // Duyêt từ phải qua trái
            content += `
                <li>
                    <span>${item.textTodo} - </span>
                    <span>${item.deadline}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" data-status="${item.status}" onclick="removeToDo(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}" data-status="${item.status}" onclick="completeToDo(event)">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
            return content;
        }, '');
        return content;
    }
    //remove a ToDo item from the list
    removeToDoItem(_index){
        this.todoList.splice(_index, 1);
    }
}