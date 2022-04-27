
//Add new todos to the list
//Mark todos as complete
//Delete todos from the list
//Clear all completed todos
//Filter by all/active/complete todos
//Drag and drop to reorder items on the list

const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector(".clear");

// Create a list item when clicking on the "Add" button

const newElement = () => {
    const li = document.createElement("li");
    const myInput = document.querySelector("#myInput").value;
    const label = document.createElement("label");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    const span = document.createTextNode(myInput);

    label.append(input, span);
    li.appendChild(label);

    if (myInput !== "") {
        document.querySelector("#myUL").appendChild(li);
        document.querySelector('#drag').classList.add("show");
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
        })
    }

    // Add a "checked" class when clicking on a list item
    li.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        label.classList.toggle('checked');
    }
    });

};

addBtn.addEventListener("click", newElement);

// Remove all completed todos when clicking on the "Clear" button

const clearItems = () => {
    const itemsCompleted = document.querySelectorAll('.checked');
    itemsCompleted.forEach(item=> {
        const div = item.parentElement;
        div.remove();
    });
};

clearBtn.addEventListener('click', clearItems)

//Add dynamic number

const todoCount = document.querySelector('.count');
todoCount.innerText = document.querySelectorAll("#myUL li").length;

const updateCount = (num) => {
    todoCount.innerText = +todoCount.innerText + num;
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

const filterSelection = (id) => {
    const todos = document.querySelectorAll('label');

    switch (id) {
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
        filterSelection(e.target.id);
    });
});

// drag-and-drop
// SortableJS -->  JavaScript library for reorderable drag-and-drop lists.

const reorderItems = document.querySelector("#myUL");
Sortable.create(reorderItems, {
    animation: 150
});