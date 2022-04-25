
//Add new todos to the list
//Mark todos as complete
//Delete todos from the list
//Clear all completed todos
//Filter by all/active/complete todos

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

//Filters
// Add active class to the current control button (highlight it)

let btns = document.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
