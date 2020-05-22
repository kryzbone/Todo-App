//SELECTORS
const myList = document.querySelector('.lists');
const listInput = document.querySelector('.list-input');
const listForm = document.querySelector('.list-form');
const clearList = document.querySelector('.clear-list')
const myTask = document.querySelector('.my-task');
const taskHead = document.querySelector('.heading');
const taskCount = document.querySelector('.task-count');
const taskBody = document.querySelector('.task-body');
const taskInput = document.querySelector('.task-input');
const taskForm = document.querySelector('.task-form');
const clearTask = document.querySelector('.clear-task');
const todoList = JSON.parse(localStorage.getItem("todo.list")) || [];


let selectedListid;
let taskId=0;
let taskRemaing;



// EVENT LISTENERS
window.addEventListener('load', () => {
    if(todoList !== null) {
       load();
       displayTask()
    }

})



listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createList(listInput.value);
    listInput.value = '';

    updateStorage()
});


clearList.addEventListener("click", () => {
    const lists = document.querySelectorAll('li')
    lists.forEach((itm, index) => {
       if (itm.classList.contains('active')) {
           itm.remove();
           todoList.splice(index, 1)
           selectedListid = null;
           updateStorage();
           displayTask();
       };
    })
})


clearTask.addEventListener('click', () => {

    todoList.forEach((item) => {
        
            if(selectedListid == item.id) {
                item.task.forEach((element, index) => {
                    if(element.complete == true) {
                        item.task.splice(index, 1) 
                        displayTask()
                    }
                })
            }
            updateStorage()
    })
})



taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createTask(taskInput.value);
    taskInput.value = ''
    updateStorage();
})


taskBody.addEventListener('click', (e) => {
    if(e.target.tagName.toLowerCase() == 'input') {
        todoList.forEach(item => {
            if(selectedListid == item.id) {
                item.task.forEach((element) => {
                   if(element.id == e.target.id) {
                       element.complete = e.target.checked;
                       taskRemaing = item.task.filter(item => !item.complete).length
                       taskCount.innerHTML = `${taskRemaing} task(s) Remaining`

                       updateStorage()
                       
                   }
                })
            }
        })
    }    
})



// FUNCTIONS

//storage
function updateStorage() {
    localStorage.setItem('todo.list', JSON.stringify(todoList))
}


function load() {
    todoList.forEach(ele => {
        const list = document.createElement('li');
        list.id = ele.id;
        list.innerHTML = ele.name; 
        list.addEventListener('click', addActive);
        myList.appendChild(list); 
    }) 
}

function createList(name) {
    if (name == '') return;
    myList.innerHTML = "";
    let id = Date.now().toString();
    todoList.push({
                name: name, 
                id: id,
                task: []
            });
    load()
}


function createTask(name) {
    if(name == '') return;
    todoList.forEach(item => {
        if(selectedListid == item.id) {
            let id = taskId++;
            item.task.push({
                name: name,
                id: id,
                complete: false,
            })
        }
    })

    displayTask();
    
}


function addActive() {
    const lists = document.querySelectorAll('li')
    lists.forEach((itm) => {
        itm.classList.remove('active');
    })
    this.classList.add('active')
    selectedListid = this.id;
    displayTask();

}


function displayTask() {
    if(selectedListid == null) {
        myTask.style.display = "none";
    } else {
        myTask.style.display = "block";
        todoList.forEach(list => {
            if(selectedListid == list.id) {
                taskRemaing = list.task.filter(item => !item.complete).length
                taskHead.innerHTML = list.name;
                taskCount.innerHTML = `${taskRemaing} task(s) Remaining`
                taskBody.innerHTML = '';

                list.task.forEach((item) => {
                    let checked = item.complete? "checked" : ""

                    const todotask = `<div class="task">
                    <input type="checkbox" id="${item.id}" ${checked}>
                    <label for="${item.id}">${item.name}</label>
                    </div>`;
                    taskBody.innerHTML += todotask;
                })
            }
        })

        console.log()
    }
}


console.log(taskId++)
