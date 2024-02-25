import { connect } from 'react-redux'
import Task from './Task'
import style from './Tasks.module.css'
import { addTasks, changeTasksType } from '../../Redux/task-reducer'
import NewTaskForm from './newTaskForm'
import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import moment from 'moment'
import DroppableTaskColumn from './DroppableTaskColumn'


let Tasks = (props) => {

    let tasks = props.tasks.sort((a, b) => moment(a.deadline, 'YYYY-MM-DD') - moment(b.deadline, 'YYYY-MM-DD'));

    let selectTasksType = (tasks, tasksType) => {  // Фильтрация по типу таска
        if (tasks)
            return tasks.filter(el => el.tasksType === tasksType);
    }

    const onSubmit = (formData) => {
        console.log(formData);
        toggleForm(false);
        document.body.style.overflow = 'visible';
        props.addTasks(formData.task, formData.deadline, formData.tasksType);
    }

    let [formOpen, toggleForm] = useState(false); // Состояние формы

    let openForm = () => {
        toggleForm(true);
        document.body.style.overflow = 'hidden';
    }

    let closeForm = () => {
        toggleForm(false);
        document.body.style.overflow = 'visible';
    }

    const handleDragDrop = (results) => { // Событие при опускании таска
        console.log(results)
        debugger;
        const { source, destination, type } = results;
        if (destination && source.draggableId !== destination.droppableId)
            props.changeTasksType(results.draggableId, results.destination.droppableId);
    }

    let urgentImportant = selectTasksType(tasks, 'urgentImportant');
    let notUrgentImportant = selectTasksType(tasks, 'notUrgentImportant');
    let urgentNotImportant = selectTasksType(tasks, 'urgentNotImportant');
    let notUrgentNotImportant = selectTasksType(tasks, 'notUrgentNotImportant');

    return (
        <div>
            {formOpen && <NewTaskForm onSubmit={onSubmit} closeForm={closeForm} />}
            <div className={style.header}>
                <button className={style.btn} onClick={openForm}>
                    <svg className={style.svg} viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                </button>
            </div>
            <div className={style.mainBlock}>
                <DragDropContext onDragEnd={handleDragDrop}>
                    <DroppableTaskColumn droppableId='urgentImportant' gridArea='one' tasks={urgentImportant}/>
                    <DroppableTaskColumn droppableId='notUrgentImportant' gridArea='two' tasks={notUrgentImportant}/>
                    <DroppableTaskColumn droppableId='urgentNotImportant' gridArea='three' tasks={urgentNotImportant}/>
                    <DroppableTaskColumn droppableId='notUrgentNotImportant' gridArea='four' tasks={notUrgentNotImportant}/>
                </DragDropContext >
            </div >
        </div>
    );
}

let mapStateToProps = (state) => ({
    tasks: state.taskPage.tasks,
})

const TasksContainer = connect(mapStateToProps, { addTasks, changeTasksType })(Tasks);


export default TasksContainer;