const ADD_NOTE = 'ADD-NOTE'
const DELETE_NOTE = 'DELETE-NOTE'

let initState = {
    notes: [
        { id: 1, note: 'При передаче методов объекта в качестве колбэков, например для setTimeout, возникает известная проблема – потеря this.', date: '23-02-2023', title: 'Потеря this' },
        { id: 2, note: 'Начнём с самого простого и важного хука – useState. Из самого названия становится понятно, что он связан с состоянием компонента. Именно благодаря ему у функциональных компонентов появилось состояние.', date: '29-02-2023', title: 'Хук useState' }
    ],
    noteID: 3
}

let noteReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_NOTE: {
            return {
                ...state,
                notes: [...state.notes, { id: state.noteID, note: action.note, date: action.date }],
                noteID: state.noteID + 1
            }
        }
        case DELETE_NOTE: {
            return {
                ...state,
                notes: state.notes.filter(el => el.id !== action.id)
            }
        }
        default: {
            return {
                state
            }
        }
    }
}

const addNote = (id, note, date) => {
    return {
        type: ADD_NOTE,
        id,
        note,
        date
    }
}

const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        id
    }
}

export default noteReducer