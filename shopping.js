//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOpt = document.querySelector(".filter");
const alert = document.querySelector(".alert");


//adding input function
const addTodo = (event) => {
    //prevent form from submitting
    event.preventDefault();
    if (todoInput.value === "") {
        alert.innerText = "Please enter valid input";
        alert.classList.add("error");
        alert.style.visibility = "visible";
        setTimeout(() => {
            alert.style.visibility = "hidden";
        }, 2500);
    } else {
        //create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoDiv");
        //create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("newTodo");
        todoDiv.appendChild(newTodo);
        saveLocalTodos(todoInput.value);
        //create complete button
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete");
        completeBtn.innerHTML = "<i class='fas fa-check'></i>";
        todoDiv.appendChild(completeBtn);
        //create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
        todoDiv.appendChild(deleteBtn);

        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }
}

//complete and delete function
const deleteComplete = (event) => {
    const item = event.target;
    if (item.classList.contains("delete-btn")) {
        item.parentElement.classList.add("fall-animation");
        removeLovalTodos(item.parentElement);
        item.parentElement.addEventListener("transitionend", () => {
            item.parentElement.remove();
        });
    } else if (item.classList.contains("complete")) {
        item.parentElement.classList.toggle("completed");
    }
}

//filter option function
const filterTodo = (event) => {
    const todoValues = todoList.childNodes;
    todoValues.forEach(function (todos) {
        console.log(event.target.value)
        switch (event.target.value) {
            case "all":
                todos.style.display = "flex";
                break;
            case "completed":
                if (todos.classList.contains("completed")) {
                    todos.style.display = "flex";
                } else {
                    todos.style.display = "none";
                }
                break;
            case "incompleted":
                if (!todos.classList.contains("completed")) {
                    todos.style.display = "flex";
                } else {
                    todos.style.display = "none";
                }
                break;
        }
    })
}


//storing data
const saveLocalTodos = (todoData) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todoData);
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodoData = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoDiv");
        //create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("newTodo");
        todoDiv.appendChild(newTodo);
        //create complete button
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete");
        completeBtn.innerHTML = "<i class='fas fa-check'></i>";
        todoDiv.appendChild(completeBtn);
        //create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
        todoDiv.appendChild(deleteBtn);

        todoList.appendChild(todoDiv);
    })
}

const removeLovalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoText = todo.children[0].innerText;
    const textIndex = todos.indexOf(todoText);
    todos.splice(textIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}


//eventListeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);
filterOpt.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodoData)