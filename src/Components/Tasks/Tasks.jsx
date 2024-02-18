import { connect } from 'react-redux'
import Task from './Task'
import style from './Tasks.module.css'
import { addTasks, changeTasksType } from '../../Redux/task-reducer'
import NewTaskForm from './newTaskForm'
import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import moment from 'moment'


let Tasks = (props) => {

    let tasks = props.tasks.sort((a, b) => moment(a.deadline, 'YYYY-MM-DD') - moment(b.deadline, 'YYYY-MM-DD'));
    
    debugger;
    let selectTasksType = (tasks, tasksType) => {
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

    const handleDragDrop = (results) => {
        console.log(results)
        debugger;
        const { source, destination, type } = results;
        if (destination && source.draggableId !== destination.droppableId)
            props.changeTasksType(results.draggableId, results.destination.droppableId);
    }

    return (
        <div>
            {formOpen && <NewTaskForm onSubmit={onSubmit} closeForm={closeForm} />}
            <div className={style.header}>
                <button onClick={openForm} className={style.openFormButton}>Add task</button>
            </div>
            <div className={style.mainBlock}>
                <DragDropContext onDragEnd={handleDragDrop}>
                    <Droppable droppableId='urgentImportant'>
                        {(provided) => (
                            <div className={style.section} style={{ gridArea: 'one' }} {...provided.droppableProps} ref={provided.innerRef}>
                                <p>Срочное, важное</p>
                                <div className={style.taskBlock}>
                                    {tasks && selectTasksType(tasks, 'urgentImportant')
                                        .map((el, index) => (
                                            <Task
                                                key={el.id}
                                                task={el.task}
                                                id={el.id}
                                                tasksType={el.tasksType}
                                                deadline={el.deadline}
                                                draggableId={el.id}
                                                index={index} />
                                        ))}
                                </div>
                                {provided.placeholder}
                                
                            </div>
                        )}

                    </Droppable>
                    
                    <Droppable droppableId='notUrgentImportant'>
                        {(provided) => (
                            <div className={style.section} style={{ gridArea: 'two' }} {...provided.droppableProps} ref={provided.innerRef}>
                                <p>Несрочное, важное</p>
                                <div className={style.taskBlock}>
                                    {tasks && selectTasksType(tasks, 'notUrgentImportant')
                                        .map((el, index) => (
                                            <Task
                                                key={el.id}
                                                task={el.task}
                                                id={el.id}
                                                tasksType={el.tasksType}
                                                deadline={el.deadline}
                                                draggableId={el.id}
                                                index={index} />
                                        ))}
                                </div>
                                {provided.placeholder}
                                <div className={style.line}></div>
                            </div>
                        )}

                    </Droppable>
                    <Droppable droppableId='urgentNotImportant'>
                        {(provided) => (
                            <div className={style.section} style={{ gridArea: 'three' }} {...provided.droppableProps} ref={provided.innerRef}>
                                <p>Срочное, неважное</p>
                                <div className={style.taskBlock}>
                                    {tasks && selectTasksType(tasks, 'urgentNotImportant')
                                        .map((el, index) => (
                                            <Task
                                                key={el.id}
                                                task={el.task}
                                                id={el.id}
                                                tasksType={el.tasksType}
                                                deadline={el.deadline}
                                                draggableId={el.id}
                                                index={index} />
                                        ))}
                                </div>
                                <div className={style.line}></div>
                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>
                    <Droppable droppableId='notUrgentNotImportant'>
                        {(provided) => (
                            <div className={style.section} style={{ gridArea: 'four' }} {...provided.droppableProps} ref={provided.innerRef}>
                                <p>Несрочное, неважное</p>
                                <div className={style.taskBlock}>
                                    {tasks && selectTasksType(tasks, 'notUrgentNotImportant')
                                        .map((el, index) => (
                                            <Task
                                                key={el.id}
                                                task={el.task}
                                                id={el.id}
                                                tasksType={el.tasksType}
                                                deadline={el.deadline}
                                                draggableId={el.id}
                                                index={index} />
                                        ))}
                                </div>
                                {provided.placeholder}
                                <div className={style.line}></div>
                            </div>
                        )}
                    </Droppable>
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