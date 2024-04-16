import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import AddCard from "./cards/AddCard"
import { deleteTeam, getTeams } from "../redux/apiCall"
import { IoArrowForwardSharp } from "react-icons/io5";
import Loader from "./cards/Loader";

const Userdashboard = () => {

  // fetching teams 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTeams())
  }, [])

  const team = useSelector((state) => state.team.teams) 
  const me = useSelector((state) => state.user.user._id)
  console.log(team);
  const isLoading = useSelector((state) => state.team.loading)
  // Delete team
  const deleteHandler = (id) => {
    dispatch(deleteTeam(id))
  }

  return (
    <div>
      {
        isLoading ? <Loader /> :

          <div className='w-[95%] flex justify-center items-center py-10 m-auto flex-wrap gap-2 '>
            {
              team.map((pro, i) => (
                <div key={i} className={`w-[90%] sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] ${i % 2 == 0 ? " bg-blue-500" : "bg-slate-500"} flex justify-center flex-col gap-5 px-5 p-2 rounded-[20px]`} >


                  <h1 className='text-center font-semibold text-[25px] capitalize round text-white'>
                    {pro.team_name}
                  </h1>

                  <div className='flex justify-between text-white capitalize text-[18px]'>
                    <Link to={`/member/${pro._id}`} className="flex flex-col gap-2">
                      <div className='text-center'>
                        team member
                      </div>
                      <div className='flex justify-center gap-3 text-center text-yellow-200 font-'>
                        <div>
                          {pro.members.length}
                        </div>
                        <div className="flex justify-center items-center">
                          <IoArrowForwardSharp />
                        </div>
                      </div>
                    </Link>

                    {/* show task of team  */}
                    <Link to={`/task/${pro._id}`} className='text-center flex flex-col gap-2 items-center justify-center'>
                      total task
                      <div className='flex gap-3 text-center text-yellow-200 font-'>
                        <div>
                          {pro.task.length}
                        </div>
                        <div className="flex justify-center items-center">
                          <IoArrowForwardSharp />
                        </div>
                      </div>
                    </Link>

                  </div>

                  <div className="flex justify-between items-center text-black font-medium py-3">
                    <Link to={`/member/${pro._id}`} className=" text-md md:text-md bg-white px-3 py-1 rounded-3xl"> Add Member</Link>
                    {
                      pro.admin.find((admin) => admin == me) ?
                        <button onClick={() => deleteHandler(pro._id)} className=" text-md md:text-md bg-white px-3 py-1 rounded-3xl">
                          Delete Team
                        </button> : ""
                    }

                  </div>

                </div >
              ))
            }
            {/* <div> */}

            {
              team.length == 0 && !isLoading ?
                <div className="w-full flex items-center justify-center m-auto font-bold text-blue-900">
                  Ooops! No Team Found... You can add new <AddCard />
                </div>
                : <AddCard />
            }



          </div>
      }
    </div >
  )
}

export default Userdashboard