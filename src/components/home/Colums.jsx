import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newColumnHandler } from "../../features/columnSlice";
import Column from "./Column";
import Modal from "./Modal";
import Task from "./Task";
import { handleTaskColumn } from "../../features/taskSlice";
import { handleModal } from "../../features/modalSlice";

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
  const taskShadow = useRef(null);

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

  const [movePerm, setMovePerm] = useState(false);
  // Using useRef instead of using DOM (querySelector or getElement)
  let currentTask = useRef(null);
  const column = document.getElementsByClassName('column');
  const [chosenColumn, setChosenColumn] = useState(null);
  const mainSection = useRef(null);

  const handleMouseDown = ({ target }) => {
    const clone = target.cloneNode(true);
    currentTask.current = target; // Selecting the task to move
    setMovePerm(true);
    taskShadow.current.appendChild(clone);
  }

  // Styling all columns to distinguish them from the chosen column
  useEffect(() => {
    const handleColumnStyle = () => {
      for(let i = 0; i < column.length; i++)
      column[i].style.backgroundColor = '#ffffff55';
    }

    // Highlighting only the hovered column during movement
    const handleColumns = (column) => {
      setChosenColumn(column);
      handleColumnStyle();
      column.style.backgroundColor = '#ccc';
    }

    // Handle the movement of tasks among columns
    const handleMouseMove = (evt) => {
      if(currentTask.current.className == 'task'){
        taskShadow.current.style.top = evt.clientY - taskShadow.current.offsetHeight + 'px';
        taskShadow.current.style.left = evt.clientX - taskShadow.current.offsetWidth / 2 + mainSection.current.scrollLeft + 'px';
        currentTask.current.style.zIndex = 100;
        // Choosing the hovered column while moving tasks
        for(let i = 0; i < column.length; i++){
          if(evt.clientX > column[i].offsetLeft - mainSection.current.scrollLeft
          && evt.clientX < column[i].offsetLeft + column[i].offsetWidth + mainSection.current.scrollLeft){
            handleColumns(column[i]);
          }
        }
      }
    }

    if(movePerm)
      window.addEventListener('mousemove', handleMouseMove);
    else
      window.removeEventListener('mousemove', handleMouseMove);

    // Stop the process of the tasks movement on mouse up event
    const handleMouseUp = (evt) => {
      if(taskShadow.current.lastChild)
      taskShadow.current.removeChild(taskShadow.current.lastChild);
      if(movePerm && chosenColumn) {
        setMovePerm(false);
        taskShadow.current.style.left = '-1000px';
        // Changing the column name of the task, for storage purposes
        const obj = {
          id: currentTask.current.id,
          columnName: chosenColumn.title
        }
        dispatch(handleTaskColumn(obj));
        setChosenColumn(null);
        handleColumnStyle();
      } else { // Make sure that the clicked element is in fact a task
        if(evt.target.className == 'task'){
          setMovePerm(false);
          setChosenColumn(null);
          // Display the clicked task
          const thisTask = tasks.find(task => task.id == evt.target.id);
          dispatch(handleModal(thisTask));
        }
      }
    }

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [movePerm, chosenColumn, tasks, column, dispatch]);

  return (
  <div id='columnMainContainer' ref={mainSection}>
    <div className="columnContainer">
      {(columnPath === null || columnPath === 'Todo') &&
      <div className='column' title='Todo' style={storedStyle}>
        <h2>Todo</h2>
        <div className='columnWrapper' style={{gap: gap ? gap + 'px' : '20px'}}>
          {filterTasks ?
            tasks.map(task => (task.columnName === 'Todo' &&
            task.assignees.some(assignee => assignee.email === myAccount[0].email)) &&
              <Task key={task.id} taskStyle={taskStyle} task={task} handleMouseDown={handleMouseDown} />)
            : tasks.map(task => (task.columnName === 'Todo' &&
              <Task key={task.id} taskStyle={taskStyle} task={task} handleMouseDown={handleMouseDown} />
            ))
          }
        </div>
      </div>}
      {columns.map(column =>
      (columnPath === column || columnPath === null) &&
      <Column key={column} column={column} tasks={tasks} handleMouseDown={handleMouseDown} />
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

    <div id='taskShadow' ref={taskShadow} style={{opacity: movePerm ? 1 : 0}}></div>
  </div>
  ); 
}

export default Colums;