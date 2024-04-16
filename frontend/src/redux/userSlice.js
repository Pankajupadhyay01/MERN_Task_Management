import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        error: null,
        user: [],
        isLogin: false
    },
    reducers: {
        Registerreq: (state) => {
            state.user = {};
            state.error = null;
            state.loading = true;
        },
        Registersuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload.user
        },
        Registerfail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // login user 

        Loginreq: (state) => {
            state.user = {};
            state.error = null;
            state.loading = true;
        },
        Loginsuccess: (state, action) => {
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
            state.isLogin = true
        },
        Loginfail: (state, action) => {
            state.loading = false;
            state.user = {};
            state.error = action.payload;
            state.isLogin = false
        },

        // logout
        Logoutreq: (state) => {
            state.error = null;
            state.loading = true;
        },
        Logoutsuccess: (state) => {
            state.user = {};
            state.loading = false;
            state.isLogin = false
        },
        Logoutfail: (state) => {
            state.loading = false;
            state.isLogin = true
        },

    }
})

export const { Registerreq, Registersuccess, Registerfail, Loginreq, Loginsuccess, Loginfail, Logoutreq, Logoutsuccess, Logoutfail } = userSlice.actions
export default userSlice.reducer