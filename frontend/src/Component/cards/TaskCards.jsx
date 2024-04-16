import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../../redux/taskapiCall';
import { useParams } from 'react-router-dom';
const TaskCards = ({ colIndex }) => {

    const data = useSelector((state) => state.task.task)
    const team_id = useParams().id

    const dispatch = useDispatch()

    const [edit, setedit] = useState(false)
    const [priority, setpriority] = useState()
    const Handledit = (id) => {
        dispatch(updateTask(id, team_id, priority))
        setedit(!edit)
    }

    const handleChange = (e) => {
        setpriority(e.target.value)
    }

    return (
        <div className=''>
            <div className='flex flex-col gap-3 p-2 flex-wrap'>
                {/* <div> */}
                {
                    data[colIndex].task.map((pro, i) => (

                        <motion.div
                            whileHover={{ translateX: -10 }}
                            key={i} className={`${i % 2 == 0 ? 'even : bg-card_color' : 'bg-gray-300'} p-6 gap-y-3 flex flex-col flex-wrap`} >
                            <div className=' font-semibold text-xl text-gray-600'>
                                {pro.title}
                            </div>
                            <div className='flex justify-between '>
                                <div>{pro.starting.split('T', 1)}</div>
                                <div>{pro.ending.split('T', 1)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className=' capitalize font-bold text-blue-950'>

                                    <select onChange={handleChange} name="" id="">
                                        <option hidden value={pro.status}>{pro.status}</option>
                                        <option value="Todo">Todo</option>
                                        <option value="Priority">Priority</option>
                                        <option value="Done">Done</option>
                                        <option value="Stuck">Stuck</option>

                                    </select>

                                </div>

                                <div className=' capitalize font-bold text-blue-950'>
                                    {pro.priority}
                                </div>

                            </div >
                            <div className=' capitalize'>
                                Assigned to:-
                                <span className=' text-green-900 font-bold'>
                                    {pro.assign_to.name}
                                </span>
                            </div>
                            <div className='flex justify-between'>

                                <div onClick={() => Handledit(pro._id)} className='bg-blue-500 px-4 py-2 rounded-full text-white font-bold cursor-pointer'>Update</div>

                                <div onClick={() => dispatch(deleteTask(pro._id, team_id))} className='bg-red-600 px-4 py-2 rounded-full text-white'>Remove</div>
                            </div>
                        </motion.div>

                    ))
                }
                {/* </div> */}
            </div>

        </div >
    )
}

export default TaskCards