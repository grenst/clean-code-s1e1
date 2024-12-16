const taskInput = document.getElementById("new__task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incomplete__tasks");
const completedTasksHolder = document.getElementById("completed__tasks");

const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    editInput.type = "text";
    editInput.className = "task-input";
    label.innerText = taskString;
    label.className = "task";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "Delete";
    deleteButtonImg.className = "pic";

    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
}

const addTask = () => {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value.trim()) return;
    const listItem = createNewTaskElement(taskInput.value.trim());

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

//Edit an existing task.

const editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    const listItem = this.parentNode;

    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function() {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}

//Mark task completed
const taskCompleted = function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    moveTask(this.parentNode, completedTasksHolder, taskIncomplete);

}

const taskIncomplete = function() {
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    moveTask(this.parentNode, incompleteTaskHolder, taskCompleted);
}



const ajaxRequest = function() {
    console.log("AJAX Request");
}

//The glue to hold it all together.
const moveTask = (listItem, destination, eventHandler) => {
    destination.appendChild(listItem);
    bindTaskEvents(listItem, eventHandler);
};


//Set the click handler to the addTask function.
addButton.addEventListener("click", () => {
    addTask();
    ajaxRequest();
});


const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

const initializeTasks = (taskHolder, eventHandler) => {
    Array.from(taskHolder.children).forEach((taskListItem) => {
        bindTaskEvents(taskListItem, eventHandler);
    });
};

initializeTasks(incompleteTaskHolder, taskCompleted);
initializeTasks(completedTasksHolder, taskIncomplete);




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.