import { connect } from 'react-redux';
import styles from './Task.module.css'
import { deleteTask, editTasks, removeTask } from '../../Redux/task-reducer';
import NewTaskForm from './newTaskForm';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

let Task = (props) => {

    function deleteTask() {
        props.removeTask(props.id);
    }

    let openForm = () => {
        toggleForm(true);
        document.body.style.overflow = 'hidden';
    }

    let closeForm = () => {
        toggleForm(false);
        document.body.style.overflow = 'visible';
    }

    const date = new Date(props.deadline);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthName = date.toLocaleString('default', { month: 'short' });

    const onSubmit = (formData) => {
        console.log(formData);
        toggleForm(false);
        document.body.style.overflow = 'visible';
        props.editTasks(props.id, formData.task, formData.deadline, formData.tasksType);
    }

    const checkDate = () => {
        let now = new Date();
        return  now.getTime() < date.getTime();
    }

    let [formOpen, toggleForm] = useState(false); // Состояние формы

    return (
        <>
            <Draggable draggableId={props.draggableId} key={props.key} index={props.index}>
                {(provided) => (
                    <div className={styles.task} onClick={openForm} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <div className={styles.taskLabel}>{props.task}</div>
                        {checkDate(day, month, year)
                            ? <div style={{ backgroundColor: 'green' }} className={styles.dateLabel}>
                                <p >{[day, monthName].join([' '])}</p>
                            </div>
                            : <div style={{ backgroundColor: 'red' }} className={styles.endDeadline }>
                                <p>Просрочено</p>
                            </div>}
                    </div>
                )}

            </Draggable>
            {formOpen && <NewTaskForm
                onSubmit={onSubmit}
                closeForm={closeForm}
                deadline={props.deadline}
                deleteTask={deleteTask}
                task={props.task}
                tasksType={props.tasksType} />}
        </>
    );
}

export default connect(null, { deleteTask, editTasks, removeTask })(Task);