
//Add new todos to the list
//Mark todos as complete
//Delete todos from the list
//Clear all completed todos
//Filter by all/active/complete todos
//Drag and drop to reorder items on the list

const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector(".clear");
const todoInput = document.querySelector("#myInput");
const textDrag = document.querySelector("#drag");

// Create a list item when clicking on the "Add" button

const newElement = () => {
    const li = document.createElement("li");
    const myInput = document.querySelector("#myInput").value;
    const label = document.createElement("label");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    const myInputValue = document.createTextNode(myInput);

    label.append(input, myInputValue);
    li.appendChild(label);

    if (myInput !== "") {
        document.querySelector("#myUL").appendChild(li);
        textDrag.style.display = "block";
        updateCount();
    }
    document.querySelector("#myInput").value = "";

    let img = document.createElement("img");
    img.src = "./build/images/icon-cross.svg";
    img.className = "close";
    li.appendChild(img);

    // Click on a close button to remove the current list item

    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", (e)=>{
            const item = e.target;
            const div = item.parentElement;
            div.remove();
            updateCount();
            const todos = document.querySelectorAll('li');
                if (todos.length === 0) {
                    textDrag.style.display = "none"; 
                }
        })
    }

    // Add a "checked" class when clicking on a list item
    li.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        label.classList.toggle('checked');
        updateCount();
    }
    });

};

addBtn.addEventListener("click", newElement);

// Create a list item with keypress event

todoInput.addEventListener('keypress', e =>{
    if (e.keyCode === 13 && todoInput.value) {
        newElement(todoInput.value);
        todoInput.value = "";
    }
});

// Remove all completed todos when clicking on the "Clear" button

const clearItems = () => {
    const itemsCompleted = document.querySelectorAll('.checked');
    itemsCompleted.forEach(item=> {
        const div = item.parentElement;
        div.remove();
        const todos = document.querySelectorAll('li');
            if (todos.length === 0) {
                textDrag.style.display = "none"; 
            }
    });
};

clearBtn.addEventListener('click', clearItems)

//Add dynamic number

const todosCount = document.querySelectorAll('.count');

const updateCount = () => {
    for (let todocount of todosCount){
        todocount.innerText = 
        document.querySelectorAll("#myUL li").length - 
        document.querySelectorAll(".checked").length;
    }
}

// Add active class to the current control button (highlight it)

let btns = document.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

//Filters

const filterSelection = (button) => {
    const todos = document.querySelectorAll('label');

    switch (button) {
        case 'all':
            todos.forEach(todo=>{
                const div = todo.parentElement;
                div.classList.remove("display");
            });
        break;
        case 'active':
            todos.forEach(todo=>{
                if (todo.classList.contains('checked')) {
                    const div = todo.parentElement;
                    div.classList.add("display");
                } else{
                    const div = todo.parentElement;
                    div.classList.remove("display");
                }
            });
        break;
        default:
            todos.forEach(todo=>{
                if (todo.classList.contains('checked')) {
                    const div = todo.parentElement;
                    div.classList.remove("display");
                } else{
                    const div = todo.parentElement;
                    div.classList.add("display");
                }
            });
        break;
    }
};

document.querySelectorAll(".btn").forEach(button =>{
    button.addEventListener('click', (e) => {
        filterSelection(e.target.dataset.button);
    });
});

// drag-and-drop
// SortableJS -->  JavaScript library for reorderable drag-and-drop lists.

const reorderItems = document.querySelector("#myUL");
Sortable.create(reorderItems, {
    animation: 150
});