import React from 'react'

const List = ({ children }) => {
    return (
        <ul className='list-group'>
            {children}
        </ul>
    )
}

export default List