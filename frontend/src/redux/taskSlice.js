import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        loading: false,
        error: null,
        task: [],
        taskCreated: false
    },
    reducers: {
        fetchTaskreq: (state) => {
            state.loading = true
            state.error = null
            state.task = []
        },

        fetchTasksucess: (state, action) => {
            state.loading = false
            state.error = null

            // dividing data on the basis of status 
            action.payload.task.map((item) => {
                const isExist = state.task.find((elem) => elem.name == item.status)
                if (isExist) {
                    isExist.task.push(item)
                }
                else {
                    state.task.push({ name: item.status, task: [item] })
                }
            })
        },

        fetchTaskfail: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.task = []
        },


        // update status 

        updateStatusreq: (state) => {
            state.loading = true
            state.error = null
        },

        updateStatussucess: (state, action) => {
            state.loading = false
            state.error = null
        },

        updateStatusfail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        // create task
        Createtaskreq: (state) => {
            state.loading = true
            state.error = null
            state.taskCreated = false
        },

        Createtasksucess: (state) => {
            state.loading = false
            state.error = null
            state.taskCreated = true
        },

        Createtaskfail: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.taskCreated = false
        },
    }
})

export const { fetchTaskreq, fetchTasksucess, fetchTaskfail,
    updateStatusreq, updateStatussucess, updateStatusfail,
    Createtaskreq, Createtasksucess, Createtaskfail } = taskSlice.actions
export default taskSlice.reducer