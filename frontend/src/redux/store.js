import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import teamSlice from './teamSlice'
import taskSlice from './taskSlice'

export default configureStore({
    reducer: {
        user: userSlice,
        team: teamSlice,
        task: taskSlice
    }
})