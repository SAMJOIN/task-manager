import { taskAPI } from "../API/api"

const ADD_TASK = 'ADD-TASK'
const DELETE_TASK = 'DELETE-TASK'
const EDIT_TASK = 'EDIT-TASK'
const CHANGE_TASK_TYPE = 'CHANGE_TASK_TYPE'

let initState = {
    tasks: []
}

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, { id: action.id, task: action.task, deadline: action.deadline, tasksType: action.tasksType }],
                taskID: String(Number(state.taskID) + 1)
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(el => el.id !== action.id)
            }
        }
        case EDIT_TASK: {
            return {
                ...state,
                tasks: state.tasks.map((el) => {
                    if (el.id === action.id) return {
                        ...el,
                        task: action.task,
                        deadline: action.deadline,
                        tasksType: action.tasksType
                    }
                    return el;
                })
            }
        }
        case CHANGE_TASK_TYPE: {
            return {
                ...state,
                tasks: state.tasks.map((el) => {
                    if (el.id === action.id) return {
                        ...el,
                        tasksType: action.tasksType
                    }
                    return el;
                })
            }
        }
        default:
            return state
    }
}

export const addTask = (id, task, deadline, tasksType) => {
    return {
        type: ADD_TASK,
        id,
        task,
        deadline,
        tasksType
    }
}

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        id
    }
}

export const editTask = (id, task, deadline, tasksType) => {
    return {
        type: EDIT_TASK,
        id,
        task,
        deadline,
        tasksType
    }
}

export const changeType = (id, tasksType) => {
    return {
        type: CHANGE_TASK_TYPE,
        id,
        tasksType,
    }
}

export const getTasks = () => {
    return (dispatch) => {
        taskAPI.getTasks().
            then(response => {
                if (response) {
                    response.forEach(task => {
                        dispatch(addTask(task.id, task.task, task.deadline, task.type));
                        debugger;
                    });
                }
                else {
                    console.log('Ошибка, не удалось получить список задач')
                }
            })
    }
}

export const removeTask = (id) => {
    return (dispatch) => {
        taskAPI.deleteTasks(id).
            then(response => {
                if (response) {
                    dispatch(deleteTask(id));
                    debugger;
                }
                else {
                    console.log('Ошибка, не удалось удалить таск')
                }
            })
    }
}

const generateId = () => {
    return Math.random().toString(36).substring(2);
}

export const addTasks = (task,deadline,tasksType) => {
    return (dispatch) => {
        const id = generateId();
        taskAPI.addTasks(id, task,deadline,tasksType).
            then(response => {
                if (response) {
                    dispatch(addTask(id, task, deadline, tasksType))
                    debugger;
                }
                else {
                    console.log('Ошибка, не удалось удалить таск')
                }
            })
    }
}

export const editTasks = (id,task,deadline,tasksType) => {
    return (dispatch) => {
        taskAPI.editTasks(id, task, deadline, tasksType).
            then(response => {
                if (response) {
                    dispatch(editTask(id, task, deadline, tasksType))
                    debugger;
                }
                else {
                    console.log('Ошибка, не удалось обновить таск')
                }
            })
    }
}

export const changeTasksType = (id,tasksType) => {
    return (dispatch) => {
        taskAPI.editTasksType(id, tasksType).
            then(response => {
                if (response) {
                    dispatch(changeType(id, tasksType))
                    debugger;
                }
                else {
                    console.log('Ошибка, не удалось обновить таск')
                }
            })
    }
}


export default taskReducer;