import Note from "./Note";


let Notes = (props) => {

    // Сделать запрос на сервак для поулчения списка записей

    let tasks = [
        {id: 1, note: 'При передаче методов объекта в качестве колбэков, например для setTimeout, возникает известная проблема – потеря this.', date: '23-02-2023', title: 'Потеря this'},
        {id: 2, note: 'Начнём с самого простого и важного хука – useState. Из самого названия становится понятно, что он связан с состоянием компонента. Именно благодаря ему у функциональных компонентов появилось состояние.', date: '29-02-2023', title: 'Хук useState'},
    ]

    let tasksElements = tasks.map(el => <Note note={el.note} date={el.date} title={el.title}/>)

    return(
        <div>
            {tasksElements}
        </div>
    );
}

export default Notes;