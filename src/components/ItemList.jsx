import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const ItemList = ({ text, id, onClick, setCurrentNote }) => {
    return (
        <li className='list-group-item list-group-item-action d-flex justify-content-between'>
            <span>{text}</span>
            <div>
                <FaEdit style={{ color: 'blue', cursor: 'pointer', margin: '0 3px' }} onClick={() => setCurrentNote({ id: id, text: text })} />
                <FaTrash style={{ color: 'red', cursor: 'pointer', margin: '0 3px' }} onClick={() => onClick(id)} />
            </div>
        </li>
    )
}

export default ItemList