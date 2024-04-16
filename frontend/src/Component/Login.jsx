import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCall';
import Loader from './cards/Loader';
import img from '/assets/react.svg'
const Login = () => {

  // for password show and hide
  const [show, setshow] = useState(false)
  const dispatch = useDispatch();

  // getting data from the redux user state 
  const { error, loading } = useSelector((state) => state.user)

  // handling the value of input's
  const [val, setval] = useState({})
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setval({ ...val, [name]: value })
  }

  // sending the user detail to the api for login
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(val))
  }

  const variants = {
    open: { opacity: 1, x: 0, scale: 1.5, transition: { delay: 0.3, type: "spring", stiffness: 200, damping: 100 } },
    closed: { opacity: 0.8, scale: 1, x: "100%", transition: { delay: 0.3 } }
  }

  return (
    < div className='flex flex-col h-[80vh] items-center m-auto gap-8 ' >

      {
        loading
          ?
          <Loader /> :
          <div className=' flex flex-col w-[80%] justify-center items-center m-auto gap-10 py-12'> 

            <h1 className='font-medium text-blue-950 text-[38px]'>Login Form</h1>

            <div className='flex md:flex-row  flex-col justify-between w-[70%] items-center m-auto'>
              <div className='flex flex-1 justify-center border-r-2 border-r-purple-500'>
                <form onSubmit={handleLogin} className='flex gap-5 flex-col px-5 justify-center items-center '>
                  <input name='email' type="text" className='bg-transparent border-2 text-purple-900 border-gray-500 p-[5px_10px] text-center outline-none  w-[280px] rounded-lg relative'
                    placeholder='Enter Your Mail' required onChange={handleChange} />
                  <div className='flex relative'>
                    <input name="pass" type={`${show ? "text" : "password"}`} className='bg-transparent border-2 text-purple-900 border-gray-500 p-[5px_10px] text-center outline-none  w-[280px] rounded-lg relative'
                      placeholder="Enter Your Password" required onChange={handleChange} minLength={6} />
                    <motion.div
                      variants={variants}
                      animate={show ? "open" : "closed"}
                      onClick={() => setshow(!show)} className='cursor-pointer absolute flex top-[30%] right-0 mx-5 text-gray-600'>
                      {show ? <FaRegEye />
                        : <FaEyeSlash />
                      }
                    </motion.div>
                  </div>

                  <motion.button
                    initial={{ background: "#845EC2" }}
                    whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200 } }}
                    type='submit' className={` ${loading ? "bg-gray-600" : 'bg-blue-500'}  px-[50px] py-[10px] rounded-full text-white flex justify-center items-ceenter`}>
                    {loading ? <motion.img animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity, repeatDelay: 1 } }} src={img} className="" /> : "Login"}
                  </motion.button>

                </form>
              </div>
              <div className='flex flex-col gap-2 my-3 flex-1 w-full items-center justify-center'>
                Don't Have Account?
                <Link to={"/register"} className='flex justify-center bg-black px-5 py-2 rounded-full text-white'> Register</Link>
              </div>

            </div>

            {/* error if exist */}


            {error &&
              <div className=' text-red-600'>**{error}**</div>
            }
          </div>
      }

    </div >

  )
}

export default Login