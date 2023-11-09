import React from 'react'

const Counter = ({ counter }) => {
    return (
        <div className='p-2 bg-secondary text-light rounded shadow'>{counter}</div>
    )
}

export default Counter