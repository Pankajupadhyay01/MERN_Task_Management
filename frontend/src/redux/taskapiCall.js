import axios from "axios";
import { Createtaskfail, Createtaskreq, Createtasksucess, fetchTaskfail, fetchTaskreq, fetchTasksucess, updateStatusfail, updateStatusreq, updateStatussucess } from "./taskSlice";

const baseUrl = import.meta.env.VITE_URL

export const createTask = (value) => async (dispatch) => {
    try {

        dispatch(Createtaskreq())
        const { data } = await axios.post(`${baseUrl}/api/v1/task/create/${value.team}`, {
            title: value.title,
            email: value.email,
            status: value.status,
            ending: value.date,
            priority: value.priority
        }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        dispatch(Createtasksucess())
        alert("Task Created Sucessfully")
    } catch (error) {
        console.log(error);
        dispatch(Createtaskfail(error.response.data.err))
        alert(error.response.data.err)
    }
}

export const fetchTask = (id) => async (dispatch) => {
    try {
        dispatch(fetchTaskreq())
        const { data } = await axios.get(`${baseUrl}/api/v1/task/tasks/${id}`, { withCredentials: true });
        dispatch(fetchTasksucess(data))
    } catch (error) {
        dispatch(fetchTaskfail(error.response.data.err))
        alert(error.response.data.err);
    }
}

export const deleteTask = (id, team) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${baseUrl}/api/v1/task/delete/${id}`, { withCredentials: true });
        dispatch(fetchTask(team))
        alert(data.msg)
    } catch (error) {
        alert(error.response.data.err)
    }
}

export const updateTask = (id, team, priority) => async (dispatch) => {
    try {
        dispatch(updateStatusreq())
        const { data } = await axios.post(`${baseUrl}/api/v1/task/change/${id}`, {
            status: priority
        }, { withCredentials: true });
        dispatch(fetchTask(team))
        alert("Status Updated ")
        dispatch(updateStatussucess())
    } catch (error) {
        alert(error.response.data.err)
        dispatch(updateStatusfail(error.response.data.err))
    }
}