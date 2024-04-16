import { logout } from '../redux/apiCall'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const Navbar = () => {

    // handle open close in nav bar
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open)
    }

    // aimation  
    const variants = {
        open: {
            clipPath: "circle(1000px at 25px 25px)",
            transition: { delay: 0.5, type: "spring", stiffness: 120, damping: 50 }
        },
        close: {
            clipPath: "circle(25px at 25px 25px)",
            transition: { delay: 0.3, duration: 1, type: "spring", stiffness: 400, damping: 50 }
        }
    }

    // logout
    const navigate = useNavigate()
    const handlelogout = (e) => {
        e.preventDefault();
        navigate("/")
        dispatch(logout())
    }

    return (
        <div className=' flex h-[50px] px-5 justify-center w-[90%] m-auto items-center'>
            <div className='flex'>

                <motion.div variants={variants} animate={open ? "open" : "close"} className={`z-[999] w-[400px] fixed top-0 left-0 bottom-0 bg-gray-500 text-white flex flex-col justify-center items-center gap-5 list-none`}>
                    <Link to={"/"}>Dashboard </Link>
                    <Link to={"/task/create"}>Add Task</Link>
                    <button onClick={handlelogout} className='bg-white text-black px-5 py-2 rounded-full font-medium'>Log out </button>
                </motion.div>
                <button onClick={handleClick} className="z-[999] fixed w-[50px] h-[50px] top-0 left-0 rounded-full bg-black text-white flex justify-center items-center ">
                    ===
                </button>
            </div>

            <motion.div drag dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0 }} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 0.3, type: "spring", delay: 0.5 } }} className='flex justify-center m-auto items-center font-bold text-yellow-600 font-sans text-[30px] '>
                WorkDay
            </motion.div >
        </div >
    )
}

export default Navbar