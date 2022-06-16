window.addEventListener('load', () => {

    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const addCartButton = document.querySelector('.add-cart');
    const cancelButton = document.querySelector('.cancel');
    const popup = document.querySelector('.popup');
    const saveButton = document.querySelector('.save');
    const form = document.querySelector('.form');
    const username = document.querySelector('#username');

    username.addEventListener('change', (e) => {
        e.preventDefault()
        const username = e.target.value
        localStorage.setItem('username', username.trim())
        displayTodos()

    })



    username.value = localStorage.getItem('username')

    cancelButton.addEventListener('click', () => {
        popup.classList.remove('active')
    })

    todos = JSON.parse(localStorage.getItem('todos')) || [];


    addCartButton.addEventListener('click', () => {
        popup.classList.add('active')

        // todos = JSON.parse(localStorage.getItem('todos')) || [];

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const todo = {
                content: '',
                done: false,
                category: '',
                date: new Date().getTime()
            }

            const inputVal = document.querySelector('#inputCart').value;
            const category = e.target.elements.category.value

            if (inputVal && category) {
                todo.content = inputVal
                todo.category = category
                todos.push(todo)
                localStorage.setItem('todos', JSON.stringify(todos))
                e.target.reset()
                popup.classList.remove('active')
                displayTodos('all')
            } else {
                popup.classList.remove('active')
            }
        })


    })

    displayTodos('all')
    filter()
    // console.log(Math.floor(Math.random()) + 2 * 10)

})

function filter() {
    const filters = document.querySelectorAll('.categories span');

    filters.forEach(data => {
        data.addEventListener('click', () => {
            const active = document.querySelector('.categories span.active');
            active.classList.remove('active')
            displayTodos(data.innerText)
            console.log(active)
            data.classList.add('active')
        })
    })

}



function displayTodos(filter) {
    const todoContent = document.querySelector('.todo-content');
    let username = localStorage.getItem('username')
    let todoItem = '';

    if (todos) {

        let background = '';

        todos.forEach((data, index) => {
            if (filter.toLowerCase() == data.category.toLowerCase() || filter.toLowerCase() == 'all') {
                todoItem += `<div class="todo-item">
                    <div class="todo-detail">
                        <textarea class="text" readonly>${data.content}</textarea>
                    </div>
                    <button onCLick='showMenu(this)'><i class="fa-solid fa-ellipsis"></i></button>
                    <div class="set">
                        <button id="edit"  onClick='updateTodo(${index},this)'><i class="fa fa-edit"></i><span>edit</span></button>
                        <button id="remove"  onClick='removeTodo(${index})'><i class="fa fa-trash"></i><span>remove</span></button>
                    </div>
                    <span span class = 'edit-save'><i class=" fa fas fa-check-square"></i></span>
                </div>`

                // background = Math.floor(Math.random()) * 2;
            }


        })

        // console.log(background)

    };

    todoContent.innerHTML = todoItem || '<span>you don"t have task here</span>';
    const d = document.querySelector('.todo-item');
    // console.log(d.style.background = 'blue')

    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
        const heigh = textarea.scrollHeight
        textarea.style.height = `${heigh}px`
    });



}

function updateTodo(indexId, event) {
    const textareas = document.querySelectorAll('textarea');

    const inputVal = event.parentElement.parentElement.firstElementChild.firstElementChild
    const iconSave = event.parentElement.parentElement.lastElementChild
    iconSave.classList.add('active')

    inputVal.removeAttribute('readonly')
    inputVal.focus()


    iconSave.addEventListener('click', () => {
        iconSave.firstElementChild.classList.replace('fa-check-square', 'fa-circle-notch')

        setTimeout(() => {

            iconSave.firstElementChild.classList.replace('fa-circle-notch', 'fa-check-square')
            iconSave.classList.remove('active')
            inputVal.setAttribute('readonly', true)

        }, 500);

    })

    inputVal.addEventListener('keyup', (e) => {
        textareas.forEach(textarea => {
            textarea.style.height = `auto`
            const heigh = textarea.scrollHeight
            textarea.style.height = `${heigh}px`
        });
        todos[indexId].content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos))
        // displayTodos()
    })
    // todos[indexId].content
}

function removeTodo(indexId) {
    todos.splice(indexId, 1);
    localStorage.setItem('todos', JSON.stringify(todos))
    displayTodos('all')


}

function showMenu(selectedMenu) {
    let taskMenu = selectedMenu.parentElement.querySelector('.set');
    const setActive = document.querySelector('.set.active')
    if (setActive) {
        setActive.classList.remove('active')
    }

    taskMenu.classList.add('active')

    document.addEventListener('click', (e) => {
        if (e.target != selectedMenu && e.target.tagName != 'I') {
            taskMenu.classList.remove('active')
        }
    })

}


function updateImage(img) {
    const imgs = img.querySelector('input')
    img.querySelector('.container-image').classList.add('active')

    document.addEventListener('click', (e) => {
        console.log(e.target.tagName)
        if (e.target != img && e.target.tagName != 'IMG' && e.target.tagName != 'INPUT') {

            img.querySelector('.container-image').classList.remove('active')


        }


    })
    imgs.addEventListener('change', (e) => {
        // e.preventDefault()
        const file = e.target.files[0]
        const form = new FormData();
const xhr = new XMLHttpRequest()

        form.append('photo', file)
        xhr.open("POST", "/images")
        xhr.send(file)
        // fetch('/upload/image',{method:'POST',body:file})
    })
}