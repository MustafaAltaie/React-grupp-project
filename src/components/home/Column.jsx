import { useState } from "react";
import propTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { deleteColumnHandler } from "../../features/columnSlice";

const Column = ({ column }) => {
    const [deleteColumn, setDeleteColumn] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteColumn = () => {
        setTimeout(() => {
            dispatch(deleteColumnHandler(column));
        }, 300);
    }

    return (
        <div className='column' style={deleteColumn ? {transform: 'translateY(100%)', opacity: 0} : {transform: 'translateY(0%)', opacity: 1}}>
            <h2>{column}</h2>
            <h5 className='deleteColumnBtn' onClick={() => (setDeleteColumn(true), handleDeleteColumn())}>Delete {column}</h5>
            <div className='columnWrapper'></div>
        </div>
    )
}

Column.propTypes = {
    column: propTypes.string
}

export default Column;