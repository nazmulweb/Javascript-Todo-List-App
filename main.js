let todoItems = [];

function addTodo(text){
    const todo = {
        text,
        checked: false,
        id: Date.now()
    }

    todoItems.push(todo);

    let list = document.querySelector('.todo-list');

    list.insertAdjacentHTML('beforeend', `
        <li class="todo-item"  data-key="${todo.id}">
            <input id="${todo.id}" type="checkbox"/>
            <label for="${todo.id}" class="tick js-tick"></label>
            <span>${todo.text}</span>
            <button class="delete btn">delete</button>
        </li>
    `)
}


const form = document.querySelector('.form');
form.addEventListener('submit', e =>{
    e.preventDefault();
    const todoInput = document.querySelector('.todo-input');
    const text = todoInput.value.trim();
    if(text !== ""){
        addTodo(text);
        todoInput.value = "";
    }
})

function toggleDone(key){
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    // console.log(item)
    if(todoItems[index].checked){
        item.classList.add('done')
    } else{
        item.classList.remove('done')
    }
}

function deleteTodo(key){
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`)
    item.remove();

    let list = document.querySelector('.todo-list');
    if(todoItems.length === 0) list.innerHTML = "";

}

const list = document.querySelector('.todo-list');
list.addEventListener('click', e =>{
    if(e.target.classList.contains('js-tick')){
        const itemKey = e.target.parentElement.dataset.key
        toggleDone(itemKey);
    }

    if(e.target.classList.contains('delete')){
        const itemKey = e.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
})