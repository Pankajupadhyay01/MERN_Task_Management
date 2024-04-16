import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { register } from '../redux/apiCall'
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import img from '/assets/react.svg'

const Registerform = () => {

    const dispatch = useDispatch()
    const { error, loading } = useSelector((state) => state.user)
    // taking value from the input
    const [value, setvalue] = useState({})
    const setval = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setvalue({ ...value, [name]: val })
    }

    // handling submit button
    const submit = (e) => {
        e.preventDefault();
        dispatch(register(value))
    }

    // for password show and hide 
    const [show, setshow] = useState(false)
    const showPass = () => {
        setshow(!show)
    }

    const variants = {
        open: { opacity: 1, x: 0, scale: 1.5, transition: { delay: 0.3, type: "spring", stiffness: 200, damping: 100 } },
        closed: { opacity: 0.8, scale: 1, x: "100%", transition: { delay: 0.3 } }
    }
    return (

        <div className='flex flex-col w-[90%] m-auto items-center h-[100vh] justify-center gap-y-10'>
            <h1 className=' font-medium text-blue-950 text-[38px]'>Register form</h1>
            <div className='flex w-[70%] justify-between md:flex-row flex-col '>
                {/* right side of form  */}
                <div className='flex justify-center gap-4 flex-col flex-1 items-center w-full lg:w-[55%] md:border-r-2'>

                    <form onSubmit={submit} className='flex flex-col gap-y-7 justify-center items-center'>
                        <input type="name"
                            name='name'
                            value={value.name}
                            onChange={setval}
                            className=' bg-transparent border-2 text-purple-900 border-gray-500 p-[5px_10px] text-center outline-none  w-[280px] rounded-lg '
                            placeholder='Enter Your Name' required

                        />
                        <input type="email"
                            name='email'
                            value={value.email}
                            onChange={setval}
                            className=' bg-transparent border-2 text-purple-900 border-gray-500 p-[5px_10px] text-center outline-none  w-[280px] rounded-lg '
                            placeholder='Enter Your Email' required
                        />
                        <div className='flex justify-between relative '>

                            <input
                                type={show ? "text" : "password"}
                                name='pass'
                                value={value.pass}
                                onChange={setval}
                                className=' bg-transparent border-2 text-purple-900 border-gray-500 p-[5px_10px] text-center outline-none  w-[280px] rounded-lg relative'
                                placeholder='Enter Your Password' required minLength={6}
                            />
                            <motion.div
                                variants={variants}
                                animate={show ? "open" : "closed"}
                                onClick={showPass} className='cursor-pointer absolute flex top-[30%] right-0 mx-5 text-gray-600'>
                                {show ? <FaRegEye />
                                    : <FaEyeSlash />

                                }
                            </motion.div>

                        </div>
                        <motion.button
                            initial={{ background: "#845EC2" }}
                            whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200 } }}
                            type='submit' className='px-[50px] py-[10px] rounded-full text-white flex justify-center items-ceenter'>
                            {loading ?
                                <motion.img animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity, repeatDelay: 1 } }} src={img} className="" />
                                : "Register"}
                        </motion.button>
                    </form>
                </div>

                {/* left side of form  */}
                <div className='flex justify-center my-3 gap-3 items-center flex-col flex-1 '>
                    Already have an account?
                    <Link to="/" className='flex justify-center bg-black px-5 py-2 rounded-full text-white'>Login</Link>

                </div>
            </div >

            <div className='text-red-500 font-bold'>
                {error ? <div>**{err}**</div> : ""}
            </div>
        </div >

    )
}

export default Registerform