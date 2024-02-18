import { combineReducers, createStore } from "redux";
import taskReducer from './task-reducer';
import noteReducer from './note-reducer';
import {reducer as formReducer} from 'redux-form'
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

let reducers = combineReducers({
    taskPage: taskReducer,
    notePage: noteReducer,
    form: formReducer
})
let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

export default store;