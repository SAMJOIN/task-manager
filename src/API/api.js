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
    async addTasks(task,deadline,type) {
        const response = await axios.post(`http://localhost:3001/tasks`, {
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