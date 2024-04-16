import React from 'react'
import GridLoader from "react-spinners/GridLoader";
const Loader = () => {
    return (
        <div className='w-full flex items-center m-auto justify-center h-[70vh] '>
            <GridLoader
                color={"#000000"}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div >
    )
}

export default Loader