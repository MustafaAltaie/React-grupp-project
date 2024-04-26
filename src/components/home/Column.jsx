import { useState } from "react";
import propTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { deleteColumnHandler } from "../../features/columnSlice";
import Task from "./Task";

const Column = ({ column, tasks }) => {
    const [deleteColumn, setDeleteColumn] = useState(false);
    const dispatch = useDispatch();
    // Stored style by settings
    const style = useSelector(state => state.settings.tasks);
    
    const padding = style.padding;
    const gap = style.gap;
    const radius = style.radius;
    const borderSize = style.borderSize;
    const borderColor = style.borderColor;
    const taskColor = style.taskColor;
    // Boards stored styles from settings
    const boardStyle = useSelector(state => state.settings.boards);
    const boardBorderColor = boardStyle.borderColor;
    const boardBorderSize = boardStyle.borderSize;
    const boardSize = boardStyle.boardSize;
    const boardGap = boardStyle.gap;
    const boardRadius = boardStyle.radius;
    const filterTasks = useSelector(state => state.tasks.filterTasks);
    const myAccount = JSON.parse(localStorage.getItem('userAccount'));

    const taskStyle = {
        padding: padding ? padding + 'px' : '20px',
        borderRadius: radius ? radius + 'px' : '10px',
        border: `solid ${borderSize ? borderSize + 'px' : '1px'} ${borderColor ? borderColor : '#005fa8'}` || 'solid 1px #005fa8',
        background: taskColor ? taskColor : '#f5f5f5',
    }

    const handleDeleteColumn = () => {
        setTimeout(() => {
            dispatch(deleteColumnHandler(column));
        }, 300);
    }

    const storedStyle = {
        border: `solid ${boardBorderSize ? boardBorderSize + 'px' : '1px'} ${boardBorderColor ? boardBorderColor : '#005fa8'}`,
        minWidth: boardSize ? boardSize + 'px' : '400px',
        maxWidth: boardSize ? boardSize + 'px' : '400px',
        borderRadius: boardRadius ? boardRadius + 'px' : '20px',
        marginRight: boardGap ? boardGap + 'px' : 0
    }

    return (
        <div className='column'
        style={{
            ...storedStyle,
            ...(deleteColumn
            ? {transform: 'translateY(100%)', opacity: 0}
            : {transform: 'translateY(0%)', opacity: 1})
        }}>
            <h2>{column}</h2>
            <h5 className='deleteColumnBtn' onClick={() => (setDeleteColumn(true), handleDeleteColumn())}>Delete {column}</h5>
            <div className='columnWrapper' style={{gap: gap ? gap + 'px' : '20px'}}>
                {filterTasks ?
                tasks.map(task => (task.columnName === column && task.assignees.some(assignee => assignee.email === myAccount[0].email)) &&
                <Task key={task.id} taskStyle={taskStyle} task={task} />
                )
            :
                tasks.map(task => task.columnName === column &&
                <Task key={task.id} taskStyle={taskStyle} task={task} />
                )
            }
            </div>
        </div>
    )
}

// {filterTasks ?
//     tasks.map(task => (task.columnName === 'Todo' && task.assignees.some(assignee => assignee.email === myAccount[0].email)) &&
//       <Task key={task.id} taskStyle={taskStyle} task={task} />)
//     : tasks.map(task => (task.columnName === 'Todo' &&
//       <Task key={task.id} taskStyle={taskStyle} task={task} />
//     ))
//   }

Column.propTypes = {
    column: propTypes.string,
    tasks: propTypes.array
}

export default Column;