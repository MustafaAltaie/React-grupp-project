import { useState } from "react";
import propTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { deleteColumnHandler } from "../../features/columnSlice";

const Column = ({ column, tasks }) => {
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
            <div className='columnWrapper'>
                {tasks.map(task =>
                column === task.columnName &&
                <div className='task' key={task.id}>
                    <div className='taskHeader'>
                        <div className="taskTitleSettingWrapper">
                            <p>{task.title}</p>
                            <div className='taskSettingBtn'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className='taskImageWrapper'>
                            {task.assignees.map(user =>
                            <img key={user.id} src={user.imageUrl} alt="Image" />)}
                        </div>
                    </div>
                    <p className='taskContent'>{task.content}</p>
                    <div className='taskFooter'>
                        <h5>P{task.priority}</h5>
                        <p>{task.endDate}</p>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

Column.propTypes = {
    column: propTypes.string,
    tasks: propTypes.array
}

export default Column;