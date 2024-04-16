import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskCards from './cards/TaskCards'
import { Link, useParams } from 'react-router-dom'
import { fetchTask } from '../redux/taskapiCall'
import Loader from './cards/Loader'

const Home = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTask(id))
    }, [])
    const data = useSelector((state) => state.task.task)

    // loading 
    const isLoading = useSelector((state) => state.task.loading)
    return (
        <>
            {
                isLoading ? <Loader />
                    :
                    <div>
                        {
                            data.length == 0 ?
                                <div className='flex gap-5 flex-col justify-center h-[50vh] items-center font-bold text-xl text-blue-950 capitalize'>
                                    no task listed yet ---
                                    <div className='flex justify-between w-[280px] font-normal text-lg'>
                                        <Link to="/task/create"> Create Task</Link>
                                        <Link to="/dashboard"> Back to Dashboard</Link>
                                    </div>
                                </div>
                                :
                                <div className={`flex justify-between text-center gap-5 overflow-x-auto w-${window.innerWidth} pt-5`}>
                                    {
                                        data.map((pro, i) => (
                                            <div key={i} className='min-w-[280px] '>
                                                <div className={`${i % 2 == 0 ? 'even: bg-[#34514A]' : 'odd: bg-red-500'} py-3 text-white capitalize text-xl`}>
                                                    {pro.name}( {pro.task.length})
                                                </div>

                                                <TaskCards key={i} colIndex={i} />
                                            </div>

                                        ))
                                    }
                                </div>
                        }


                    </div>
            }
        </>
    )
}

export default Home