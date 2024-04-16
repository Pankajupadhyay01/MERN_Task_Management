// other team api calls is at apiCall.js
import axios from "axios"
import { Getmemberfail, Getmemberreq, Getmembersucess, changeRolefail, changeRolereq, changeRolesucess } from "./teamSlice"
const baseUrl = import.meta.env.VITE_URL

// get member's of teams 

export const getMembers = (teamId) => async (dispatch) => {
    try {
        dispatch(Getmemberreq())
        const { data } = await axios.get(`${baseUrl}/api/v1/teams/getmember/${teamId}`, { withCredentials: true })

        dispatch(Getmembersucess(data))
    } catch (error) {
        alert(error.response.data.err)
        dispatch(Getmemberfail(error.response.data.err))
    }
}

// remmove member from team

export const removeMember = ({ mail, teamId }) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${baseUrl}/api/v1/teams/remove/${teamId}`, { email: mail }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        alert(data.msg)
        dispatch(getMembers(teamId))
    } catch (error) {
        alert(error.response.data.err)
    }
}

// add member in team

export const addMember = ({ email, teamId }) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${baseUrl}/api/v1/teams/adduser/${teamId}`, { email },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
        alert(data.msg)
        dispatch(getMembers(teamId))
    } catch (error) {
        alert(error.response.data.err)
    }
}

// adding admin 

export const addAdmin = ({ mail, teamId }) => async (dispatch) => {
    try {
        dispatch(changeRolereq())
        const { data } = await axios.post(`${baseUrl}/api/v1/teams/makeadmin/${teamId}`, { email: mail }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        dispatch(changeRolesucess(data))
        alert(data.msg)
    } catch (error) {
        alert(error.response.data.err)
        dispatch(changeRolefail(error))
    }
}