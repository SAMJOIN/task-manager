import { noteAPI } from "../API/api"

const ADD_NOTE = 'ADD-NOTE'
const DELETE_NOTE = 'DELETE-NOTE'
const EDIT_NOTE = 'EDIT_NOTE'

let initState = {
    notes: []
}

let noteReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_NOTE: {
            debugger;
            return {
                ...state,
                notes: [...state.notes, { id: action.id, title: action.title, note: action.note, date: action.date, color: action.color }],
            }
        }
        case DELETE_NOTE: {
            return {
                ...state,
                notes: state.notes.filter(el => el.id !== action.id)
            }
        }
        case EDIT_NOTE: {
            return {
                ...state,
                notes: state.notes.map((el) => {
                    if (el.id === action.id) return {
                        ...el,
                        title: action.title,
                        note: action.note,
                        color: action.color
                    }
                    return el;
                })
            }
        }
        default: {
            return state
        }
    }
}

const addNote = (id, title, note, date, color) => {
    return {
        type: ADD_NOTE,
        id,
        title,
        note,
        date,
        color
    }
}

const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        id
    }
}

const editNote = (id, title, note, color) => {
    return {
        type: EDIT_NOTE,
        id,
        title,
        note,
        color
    }
}

export const getNotes = () => {
    debugger;
    return (dispatch) => {
        noteAPI.getNotes().
            then(response => {
                if (response) {
                    response.forEach(note => {
                        dispatch(addNote(note.id, note.title, note.note, note.date, note.color));
                        debugger;
                    });
                }
                else {
                    console.log('Ошибка, не удалось получить список записей')
                }
            })
    }
}

export const removeNote = (id) => {
    return (dispatch) => {
        noteAPI.deleteNote(id).
            then(response => {
                if (response) {
                    dispatch(deleteNote(id));
                    debugger;
                }
                else {
                    console.log('Ошибка, не удалось удалить запись')
                }
            })
    }
}

const generateId = () => {
    return Math.random().toString(36).substring(2);
}

export const addNotes = (title, note, date, color) => {
    return (dispatch) => {
        const id = generateId();
        noteAPI.addNote(id, title, note, date, color).
            then(response => {
                if (response) {
                    dispatch(addNote(id, title, note, date, color))
                    debugger;
                }
                else {
                    console.log('Ошибка, не удалось добавить запись')
                }
            })
    }
}

export const editNotes = (id, title, note, color) => {
    return (dispatch) => {
        noteAPI.editNote(id, title, note, color).
            then(response => {
                if (response) {
                    dispatch(editNote(id, title, note, color))
                    debugger;
                }
                else {
                    console.log('Ошибка, не удалось обновить запись')
                }
            })
    }
}

export default noteReducer;