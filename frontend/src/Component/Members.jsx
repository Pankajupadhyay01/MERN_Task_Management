import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { addAdmin, addMember, getMembers, removeMember } from '../redux/teamapiCall';
import Loader from './cards/Loader';
import img from '/assets/react.svg'
const Members = () => {

    // mail for add member 
    const [email, setemail] = useState("")

    // fetching member of individual team 
    const dispatch = useDispatch();
    const teamId = useParams().id

    // getting all member  
    const { member, loading, admins } = useSelector((state) => state.team)
    useEffect(() => {
        dispatch(getMembers(teamId))
    }, [])


    // remove user 
    const remove = (mail, teamId) => {
        dispatch(removeMember({ mail, teamId }))

    }

    // add member 
    const addmember = (e) => {
        e.preventDefault()
        dispatch(addMember({ email, teamId }))
        setemail("")

    }

    const makeadmin = (mail) => {
        dispatch(addAdmin({ mail, teamId }))
    }


    // const admin = useSelector((state) => state.team.)
    const user = useSelector((state) => state.user.user)


    return (
        <div>
            {loading ? <Loader /> :
                <div className='w-[90%] flex flex-col gap-5 justify-center items-center m-auto my-5'>
                    {
                        member.map((member, i) => (
                            <div key={i} className='flex flex-col sm:flex-row gap-3  justify-between w-full sm:w-[80%] bg-blue-500 p-3 items-center '>
                                <div className='text-[22px] text-white'>
                                    {member.name}
                                </div>
                                {
                                    admins.find((elem) => elem == user._id) ?
                                        <div className='flex gap-5 '>
                                            <div onClick={() => remove(member.email, teamId)} className='text-sm sm:text-lg font-medium text-white bg-red-500 p-2 rounded-lg cursor-pointer'>Remove</div>
                                            <div onClick={() => makeadmin(member.email)} className='text-sm sm:text-lg font-medium text-white bg-green-500 p-2 rounded-lg cursor-pointer'>
                                                {
                                                    admins.find((elem) => elem == member._id) ?
                                                        "Remove Admin"
                                                        :
                                                        "Make Admin"
                                                }
                                            </div>
                                        </div>
                                        : ""
                                }

                            </div>
                        ))
                    }


                    <form onSubmit={addmember} className='flex flex-col sm:flex-row gap-5 justify-center bg-blue-500 p-3 items-center '>
                        <input type="text" onChange={(e) => setemail(e.target.value)} value={email} placeholder='Enter Member Name' className='p-2 rounded-l' required />
                        <button type='submit' className='bg-white p-2 rounded-lg font-bold'>
                            Add
                        </button>
                    </form>
                </div >
            }
        </div>

    )
}

export default Members