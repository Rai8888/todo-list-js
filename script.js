const form = document.querySelector('#form');
const list = document.querySelector('#list');

form.addEventListener('submit', onFormSubmit);


function onFormSubmit (event) {
    // Предотвращаем поведение по умолчанию, 
    // а именно перезагрузку страницы
    event.preventDefault();
    // Ссылка на форму
    const formElement = event.target;

    // Ссылка на текстовое поле
    const inputElement = formElement.text;

    // Название будущей задачи
    const todoName = inputElement.value;

    // Создание новой задачи
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo')
    newTodo.innerHTML = `
        <div>
            <span class="todo-name">${todoName}</span>
            <button class="delete-btn"> DELETE </button>
            <button class="edit-btn">EDIT</button>
        </div>
    `;


    // Добавляем в DOM (HTML) новую задачу

    list.appendChild(newTodo);

    // в списке существующих задач ищет текущую
    const task = Array.from(list.children).find(el => el === newTodo);

    // Добавляем текущей задаче обработчик события по клику
    task.addEventListener('click', (e) =>  {
        const isDeleteButton = e.target.classList.toString() === 'delete-btn';
        const isEditButton = e.target.classList.toString() === 'edit-btn';

        // Если клик был произведен по кнопке "удалить" то удаляем задачу
        if (isDeleteButton) onTaskDelete(task);
       


        //Если клик был  произведен по кнопке "Редактировать",
        //то редактируем название задачи
        if (isEditButton) onTaskEdit(task);
        
    });


    // Очистка текстового поля после
    inputElement.value = '';

    function onTaskDelete(task) {
        task.remove();
    }

    function onTaskEdit(task) {
        const newTodoName = prompt('Enter a new task name');
        const isValid = newTodoName.length > 3 && newTodoName.length < 20;
        if (isValid) {
            const span = task.querySelector('.todo-name');
            span.innerHTML = newTodoName;
        }else alert('Name length should be greater than 3 and less than 20');
    }
}