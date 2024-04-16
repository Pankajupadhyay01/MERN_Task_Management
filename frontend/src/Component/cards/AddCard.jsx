import React, { useState } from "react"
import { FaCirclePlus } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { createteam } from "../../redux/apiCall";
const AddCard = () => {
    const [show, setshow] = useState(false)
    const [team, setteam] = useState()
    const dispatch = useDispatch()

    // getting text 
    const handleChange = (e) => {
        const val = e.target.value;
        setteam(val)
    }

    // handling submit button 
    const func = (e) => {
        e.preventDefault()
        dispatch(createteam(team))
    }

    // animation
    const variants = {
        open: {
            clipPath: "circle(1000px at 25px 25px)",
            height: "200px",
        },
        close: {
            clipPath: "circle(20px at 25px 25px)",
            transition: { delay: 0.5, type: "spring", stiffness: 400, damping: 100 },
            height: "50px",
        }
    }
    const buttonvariants = {
        open: {
            left: "45%",
        },
        close: {
            left: "0",
            // transition: { delay: 0.8 },
            rotate: [270]
        }
    }

    return (

        <motion.div variants={variants} animate={show ? "open" : "close"} className="w-[90%] sm:w-[calc(50%-10px)] md:w-[calc(33%-10px)] flex justify-center flex-col items-center bg-purple-500 rounded-lg relative m-auto gap-5 overflow-hidden">
            <form onSubmit={func} className="flex flex-col mt-12 p-2 gap-2 overflow-hidden">
                <input type="text" name="team_name" onChange={handleChange} className=" bg-transparent border-2 text-white border-black p-[5px_10px] text-center outline-none w-[350px]" placeholder="Enter Your Task" required autoComplete="off" />
                <button type="submit" className="bg-white w-[150px] p-[3px] rounded-full flex justify-center items-center m-auto">Create Team</button>
            </form>
            <motion.button variants={buttonvariants} animate={show ? "open" : "close"} onClick={() => setshow(!show)} className="bg-blue-500 p-3 rounded-full absolute left-0 top-0 text-[25px] text-white">
                {show ? <AiFillCloseCircle /> : <FaCirclePlus />}
            </motion.button>
        </motion.div>
    )
}

export default AddCard