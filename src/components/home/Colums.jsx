import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newColumnHandler } from "../../features/columnSlice";
import Column from "./Column";
import Modal from "./Modal";
import Task from "./Task";

const Colums = () => {
  const [columnMenu, setColumnMenu] = useState(false);
  const [newColumn, setNewColumn] = useState('');
  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns.columns);
  const tasks = useSelector(state => state.tasks.tasks);
  const columnPath = useSelector(state => state.columns.column);
  // Task stored styles from settings
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

  const prepareColumn = () => {
    dispatch(newColumnHandler(newColumn));
    setColumnMenu(false);
  }

  useEffect(() => {
    !columnMenu && setNewColumn('');
  }, [columnMenu]);

  const handleKeyDown = (e) => {
    e.key === 'Enter' && prepareColumn();
  }

  const storedStyle = {
    border: `solid ${boardBorderSize ? boardBorderSize + 'px' : '1px'} ${boardBorderColor ? boardBorderColor : '#005fa8'}`,
    minWidth: boardSize ? boardSize + 'px' : '400px',
    maxWidth: boardSize ? boardSize + 'px' : '400px',
    borderRadius: boardRadius ? boardRadius + 'px' : '20px',
    marginRight: boardGap ? boardGap + 'px' : 0
  }

  return (
    <div id='columnMainContainer'>
    <div className="columnContainer">
      {(columnPath === null || columnPath === 'Todo') &&
      <div className='column' style={storedStyle}>
        <h2>Todo</h2>
        <div className='columnWrapper' style={{gap: gap ? gap + 'px' : '20px'}}>
          {filterTasks ?
            tasks.map(task => (task.columnName === 'Todo' &&
            task.assignees.some(assignee => assignee.email === myAccount[0].email)) &&
              <Task key={task.id} taskStyle={taskStyle} task={task} />)
            : tasks.map(task => (task.columnName === 'Todo' &&
              <Task key={task.id} taskStyle={taskStyle} task={task} />
            ))
          }
        </div>
      </div>}
      {columns.map(column =>
      (columnPath === column || columnPath === null) &&
      <Column key={column} column={column} tasks={tasks} />
      )}

      {columnMenu &&
      <div id="newFormMenu">
        <input
        type="text"
        value={newColumn}
        onChange={e => setNewColumn(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
        />
        {newColumn && <button onClick={prepareColumn}>Add {newColumn}</button>}
      </div>}

      <h1
      title={columnMenu ? 'Close' : 'New Board'}
      onClick={() => setColumnMenu(!columnMenu)}
      style={{transform: `rotate(${columnMenu ? 135 : 0}deg)`}}
      >+</h1>
    </div>

    <Modal />
    </div>
  ); 
}

export default Colums;