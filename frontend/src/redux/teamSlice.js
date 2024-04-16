import { createSlice } from '@reduxjs/toolkit'

const teamSlice = createSlice({
    name: 'teams',
    initialState: {
        loading: true,
        error: null,
        teams: [],
        member: [],
        admins: []
    },
    reducers: {
        fetchTeamreq: (state) => {
            state.loading = true
            state.error = null
            state.teams = []
        },

        fetchTeamsucess: (state, action) => {
            state.loading = false
            state.error = null
            state.teams = action.payload
        },

        fetchTeamfail: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.teams = []
        },

        //   Create team
        CreateTeamreq: (state) => {
            state.loading = true
            state.error = null
        },

        CreateTeamsucess: (state, action) => {
            state.loading = false
            state.error = null
            state.teams.push(action.payload.team) 
        },

        CreateTeamfail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //   delete team
        deleteTeamreq: (state) => {
            state.loading = true
            state.error = null
        },

        deleteTeamsucess: (state) => {
            state.loading = false
            state.error = null
        },

        deleteTeamfail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //  fetch member of an team 
        Getmemberreq: (state) => {
            state.loading = true
            state.error = null
        },

        Getmembersucess: (state, action) => {
            state.loading = false
            state.error = null
            state.member = action.payload.members
            state.admins = action.payload.admin
        },

        Getmemberfail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


        // changing user role form user to admin and vise versa  

        changeRolereq: (state) => {
            state.loading = true
            state.error = null
        },

        changeRolesucess: (state, action) => {
            state.loading = false
            state.error = null
            state.admins = action.payload.admin
        },

        changeRolefail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { fetchTeamreq, fetchTeamsucess, fetchTeamfail,
    CreateTeamreq, CreateTeamsucess, CreateTeamfail,
    deleteTeamreq, deleteTeamsucess, deleteTeamfail,
    Getmemberreq, Getmembersucess, Getmemberfail,
    changeRolereq, changeRolesucess, changeRolefail
} = teamSlice.actions
export default teamSlice.reducer