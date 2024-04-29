import axios from "axios"
import { Loginfail, Loginreq, Loginsuccess, Logoutfail, Logoutreq, Logoutsuccess, Registerfail, Registerreq, Registersuccess } from "./userSlice"
import { CreateTeamreq, CreateTeamfail, CreateTeamsucess, fetchTeamfail, fetchTeamreq, fetchTeamsucess, deleteTeamfail, deleteTeamreq, deleteTeamsucess } from "./teamSlice"

const baseUrl = import.meta.env.VITE_URL

export const register = (value) => async (dispatch) => {
    try {
        dispatch(Registerreq())
        const email = value.email;
        const password = value.pass;
        const name = value.name;
        const { data } = await axios.post(`${baseUrl}/api/v1/user/signup`, { name, email, password },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )

        dispatch(Registersuccess(data))
        alert("Register Successfully")
    } catch (error) {
        console.log(error);
        dispatch(Registerfail(error.response.data.err))
    }

}

// login user api call 
export const login = (value) => async (dispatch) => {
    try {
        dispatch(Loginreq())
        const email = value.email;
        const password = value.pass;
        const { data } = await axios.post(`${baseUrl}/api/v1/user/login`, { email, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })

        console.log(data);

        dispatch(Loginsuccess(data))
        alert("Login Successfully")
    } catch (error) {
        dispatch(Loginfail(error.response.data.err))
    }
}

// loading user
export const loaduser = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/v1/user/me`, { withCredentials: true })
        console.log(data);
        dispatch(Loginsuccess(data))
    } catch (error) {
        dispatch(Loginfail())
    }
}

// logout user 

export const logout = () => async (dispatch) => {
    try {
        dispatch(Logoutreq())
        await axios.get(`${baseUrl}/api/v1/user/logout`, { withCredentials: true })

        dispatch(Logoutsuccess())
        alert("Logout Successfully")

    } catch (err) {
        dispatch(Logoutfail())
    }
}

// create team

export const createteam = (value) => async (dispatch) => {
    try {
        dispatch(CreateTeamreq())
        const { data } = await axios.post(`${baseUrl}/api/v1/teams/create`, { team_name: value }, {
            headers: { "Content-Type": "application/json" }, withCredentials: true
        })
        dispatch(CreateTeamsucess(data))
        alert("Create Team Successfully")
    } catch (err) {
        dispatch(CreateTeamfail(err.response.data.err))
    }
}

// Fetching the teams for login user
export const getTeams = () => async (dispatch) => {
    try {
        dispatch(fetchTeamreq())
        const { data } = await axios.get(`${baseUrl}/api/v1/teams/get`, { withCredentials: true })
        console.log(data);
        dispatch(fetchTeamsucess(data.teams))
    } catch (err) {
        dispatch(fetchTeamfail(err.response.data.err))
    }
}

// delete team
export const deleteTeam = (id) => async (dispatch) => {
    try {
        dispatch(deleteTeamreq())
        await axios.get(`${baseUrl}/api/v1/teams/delete/${id}`, { withCredentials: true })
        dispatch(deleteTeamsucess())
        dispatch(getTeams())
        alert("Team Deleted Successfully")
    } catch (err) {
        alert(err.response.data.err)
        dispatch(deleteTeamfail(err.response.data.err))
    }
}