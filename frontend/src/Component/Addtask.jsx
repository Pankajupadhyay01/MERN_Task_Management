import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTeams } from '../redux/apiCall'
import { useState } from 'react'
import { createTask } from '../redux/taskapiCall'
import img from '/assets/addtask.png'
const Addtask = () => {
    // loading task
    const dispatch = useDispatch()
    useEffect(() => {
        getTeams(dispatch)
    }, [])

    const team = useSelector((state) => state.team.teams)
    const { taskCreated, loading } = useSelector((state) => state.task)
    // retriving and storing the data 
    const [val, setval] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setval({ ...val, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createTask(val))
    }

    return (
        <div className='flex w-full h-[100vh] py-12 justify-between m-auto items-center flex-col lg:flex-row'>
            {/* right side of form  */}
            <div className='flex justify-center gap-4  flex-1 items-center w-full lg:w-[55%] md:border-r-2'>

                <form onSubmit={handleSubmit} action='post' className='flex flex-wrap w-[80%] gap-y-7 gap-x-2 justify-center items-center'>
                    <input type="text"
                        value={val.name}
                        name='title'
                        onChange={handleChange}
                        className='w-[280px] py-2 px-2 outline-none border-2 text-center rounded-full border-black '
                        placeholder='Enter Title of Task' required />

                    <input type="email"
                        value={val.name}
                        name='email'
                        onChange={handleChange}
                        className='w-[280px] py-2 px-2 outline-none border-2 text-center rounded-full border-black'
                        placeholder='Mail of user to assign task' required />

                    <input type="date"
                        name='date'
                        onChange={handleChange}
                        className='w-[280px] py-2 px-2 outline-none border-2 text-center rounded-full border-black'
                        placeholder='Mail of user to assign task' required />


                    <select name="status" id=""
                        onChange={handleChange}
                        className='text-red-500 w-[180px] bg-blue-200 py-2'>
                        <option value="value">Select Status</option>

                        <option value="Todo">Todo</option>
                        <option value="Priority">Priority</option>
                        <option value="Stuck">Stuck</option>
                    </select>

                    <select name="team" id=""
                        onChange={handleChange}
                        className='text-red-500 w-[180px] bg-blue-200 py-2'>
                        <option value="value">Select team</option>

                        {
                            team.map((pro, i) => (
                                <option key={i} value={pro._id}>{pro.team_name}</option>
                            ))
                        }
                    </select>

                    <select name="priority" id=""
                        onChange={handleChange}
                        className='text-red-500 w-[180px] bg-blue-200 py-2'>
                        <option value="value">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>


                    <button type='submit' className=' bg-purple-700 w-[180px] px-5 text-white capitalize py-3 rounded-full '>
                        {loading ? "Loading..." : "Add Task"}
                    </button>
                </form>
            </div>

            {/* left side of form  */}
            <div
                className='hidden  lg:flex justify-center items-center flex-1'>
                <img src={img} alt="" />
            </div>
        </div >


    )
}

export default Addtask
