const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("item");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;
let data = localStorage.getItem("toDo");
if(data)
{
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else
{
    LIST = [];
    id = 0;
}

function loadList(array)
{
    array.forEach(function(item)
    {
        addItem(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();
date.innerHTML = "Date of today is : " + today.toLocaleDateString("en-US", options);

function addItem(toDo, id, done, trash)
{
    if(trash)
    {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
document.addEventListener("keyup", function(event)
{
    if(event.keyCode == 13)
    {
        const toDo = input.value;
        if(toDo)
        {
            addItem(toDo, id, false, false);
            LIST.push(
            {
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            localStorage.setItem("toDo", JSON.stringify(LIST));
            input.value= "";
            id++;
        }
    }
});

function complete(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function remove(element){

    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementAttribute = element.attributes.job.value;
    if(elementAttribute == "complete")
    {
        complete(element);
    }
    else if(elementAttribute == "delete")
    {
        remove(element);
    }
    localStorage.setItem("toDo", JSON.stringify(LIST));
});


