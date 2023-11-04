import { ToDo } from "./ToDo.js";
import { ToDoList } from "./ToDoList.js";

// create a new ToDoList object
let objTodoList = new ToDoList();
let completedList = new ToDoList();

// dom elements by id
const getEle = (id) =>{
    return document.getElementById(id);
}

// add ToDo item to the list when user clicks on the add button
const addToDo = () =>{
    // get the input values
    let txtTodo = getEle("newTask").value;
    let ulTodo = getEle("uncompleted");

    if (txtTodo !== "") {
        let todo = new ToDo(txtTodo, "uncompleted", "");
    // console.log(todo);
    // add the new ToDo item to the list
        objTodoList.addToDoItem(todo);    
    }
    // console.log(objTodoList.todoList);
    // render the list
    renderList(ulTodo, objTodoList);

    // clear the input value
    getEle("newTask").value = "";
    
}

const renderList = (ul, objList) =>{
    // get the ul element
    ul.innerHTML = objList.renderToDoContent();
}

// add event listener to the add button
getEle("addItem").addEventListener("click", () =>{
    addToDo();
});

// remove a ToDo item from the list
const removeToDo = (event) =>{
    console.log(event);
    let todoIndex = event.currentTarget.getAttribute("data-index");
    let todoStatus = event.currentTarget.getAttribute("data-status");
    console.log(todoStatus);
    if (todoStatus === "uncompleted") {
        // remove the ToDo item from the list
        objTodoList.removeToDoItem(todoIndex);
        // render the list again
        renderList(getEle("uncompleted"), objTodoList);
    }else{
        // remove the ToDo item from the list
        completedList.removeToDoItem(todoIndex);
        // render the list again
        renderList(getEle("completed"), completedList);
    }
}

window.removeToDo = removeToDo;

// complete a ToDo item
const completeToDo = (event) =>{
    let todoIndex = event.currentTarget.getAttribute("data-index");
    let todoStatus = event.currentTarget.getAttribute("data-status");
    let ulTodo = getEle("uncompleted");
    let ulCompleted = getEle("completed");
    
    if (todoStatus === "uncompleted") {
        let completedItem = objTodoList.todoList.slice(todoIndex, todoIndex + 1);
        // console.log(completedItem);
        let objCompletedItem = new ToDo(completedItem[0].textTodo, "completed", completedItem[0].deadline);
        // console.log(objCompletedItem);
        // move the completed item to the completed list
        moveToCompletedList(objTodoList, completedList, objCompletedItem, todoIndex);
        // console.log(objTodoList.todoList);
        // console.log(completedList.todoList);
        // render the list again
        renderList(ulTodo, objTodoList);
        renderList(ulCompleted, completedList);
    }else{
        let uncompletedItem = completedList.todoList.slice(todoIndex, todoIndex + 1);
        // console.log(uncompletedItem);
        let objUncompletedItem = new ToDo(uncompletedItem[0].textTodo, "uncompleted", uncompletedItem[0].deadline);
        // console.log(objUncompletedItem);
        // move the completed item to the completed list
        moveToCompletedList(completedList, objTodoList, objUncompletedItem, todoIndex);
        // console.log(objTodoList.todoList);
        // console.log(completedList.todoList);
        // render the list again
        renderList(ulTodo, objTodoList);
        renderList(ulCompleted, completedList);
    
    }
}

// Move completed item to completed list
const moveToCompletedList = (depart, arrival, obj, index) =>{
    // remove the ToDo item from the list
    depart.removeToDoItem(index);
    // // render the list again
    // renderList(depart);
    // add the new ToDo item to the list
    arrival.addToDoItem(obj);
    // // render the list
    // renderList(arrival);
}

window.completeToDo = completeToDo;