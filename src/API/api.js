import axios from "axios";



export const taskAPI = {
    async getTasks() {
        const response = await axios.get('http://localhost:3001/tasks');
        debugger;
        return response.data;
    },
    async deleteTasks(id) {
        const response = await axios.delete(`http://localhost:3001/tasks/${id}`);
        debugger;
        return response.data;
    },
    async addTasks(id, task,deadline,type) {
        const response = await axios.post(`http://localhost:3001/tasks`, {
            id,
            task,
            deadline,
            type
        });
        debugger;
        return response.data;
    },
    async editTasks(id, task, deadline, type) {
        const response = await axios.patch(`http://localhost:3001/tasks/${id}`, {
            task,
            deadline,
            type
        });
        debugger;
        return response.data;
    },
    async editTasksType(id, type) {
        const response = await axios.patch(`http://localhost:3001/tasks/${id}`, {
            type
        });
        debugger;
        return response.data;
    },
}

export const noteAPI = {
    async getNotes() {
        const response = await axios.get('http://localhost:3001/notes');
        debugger;
        return response.data;
    },
    async deleteNote(id) {
        const response = await axios.delete(`http://localhost:3001/notes/${id}`);
        debugger;
        return response.data;
    },
    async addNote(id, title, note, date, color) {
        const response = await axios.post(`http://localhost:3001/notes`, {
            id,
            title,
            note,
            date,
            color
        });
        debugger;
        return response.data;
    },
    async editNote(id, title, note, color) {
        const response = await axios.patch(`http://localhost:3001/notes/${id}`, {
            title,
            note,
            color
        });
        debugger;
        return response.data;
    },
}