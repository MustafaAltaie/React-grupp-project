import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newColumnHandler } from "../../features/columnSlice";
import Column from "./Column";
import Modal from "./Modal";
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
  const imageSize = style.imageSize;
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
          {tasks.map(task => task.columnName === 'Todo' &&
          <div className='task' style={taskStyle} key={task.id} onClick={() => dispatch(handleModal(task))}>
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
                <img key={user.id} style={{width: imageSize ? imageSize + 'px' : '35px', height: imageSize ? imageSize + 'px' : '35px'}} src={user.imageUrl} alt="Image" />)}
              </div>
            </div>
            <p className='taskContent'>{task.content}</p>
            <div className='taskFooter'>
              <h5>P{task.priority}</h5>
              <div>
                  <p>Starts: {task.startDate}</p>
                  <p>Ends: {task.endDate}</p>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>}
      {columns.map(column =>
      (columnPath === column || columnPath === null) && <Column key={column} column={column} tasks={tasks} />
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