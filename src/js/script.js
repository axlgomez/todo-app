const addBtn = document.querySelector(".addBtn");

// Create a list item when clicking on the "Add" button

function newElement() {
    const li = document.createElement("li");
    const myInput = document.querySelector("#myInput").value;
    // const span = document.createElement("span");
    // var x = document.createElement("input");
    // x.setAttribute("type", "checkbox");
    const p = document.createTextNode(myInput);

    // span.append(x, p);
    li.appendChild(p);

    if (myInput !== "") {
        document.querySelector("#myUL").appendChild(li);
    }
    document.querySelector("#myInput").value = "";

    let img = document.createElement("img");
    img.src = "./build/images/icon-cross.svg";
    img.className = "close";
    li.appendChild(img);

    // Click on a close button to hide the current list item

    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", (e)=>{
            const item = e.target;
            const div = item.parentElement;
            div.remove();
        })
    }
};

addBtn.addEventListener("click", newElement);