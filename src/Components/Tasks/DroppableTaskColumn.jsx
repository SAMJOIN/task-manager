import { Droppable } from "react-beautiful-dnd";
import style from './Tasks.module.css'
import Task from "./Task";

const DroppableTaskColumn = (props) => {
    return (
        <Droppable droppableId={props.droppableId}>
            {(provided) => (
                <div className={style.section} style={{ gridArea: props.gridArea }} {...provided.droppableProps} ref={provided.innerRef}>
                    <p>Несрочное, важное</p>
                    <div className={style.taskBlock}>
                        {props.tasks
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
                    {props.gridArea == 'one'? <></> : <div className={style.line}></div>} 
                </div>
            )}

        </Droppable>
    );
}

export default DroppableTaskColumn;