window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const addCartButton = document.querySelector('.add-cart');
    const cancelButton = document.querySelector('.cancel');
    const popup = document.querySelector('.popup');
    const saveButton = document.querySelector('.save');
    const form = document.querySelector('.form');

    cancelButton.addEventListener('click', () => {
        popup.classList.remove('active')
    })
    addCartButton.addEventListener('click', () => {
        popup.classList.add('active')

        todos = JSON.parse(localStorage.getItem('todos')) || [];

        const todo = {
            content: '',
            done: false,
            date: new Date().getTime()
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const inputVal = document.querySelector('#inputCart').value;
            if (inputVal) {
                todo.content = inputVal
                todos.push(todo)
                localStorage.setItem('todos', JSON.stringify(todos))
                e.target.reset()
                popup.classList.remove('active')


            }
        })


    })

})