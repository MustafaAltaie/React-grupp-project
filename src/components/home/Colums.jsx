import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newColumnHandler } from "../../features/columnSlice";
import Column from "./Column";

const Colums = () => {
  const [columnMenu, setColumnMenu] = useState(false);
  const [newColumn, setNewColumn] = useState('');
  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns.columns);
  const tasks = useSelector(state => state.tasks.tasks);

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

  return (
    <>
    <div className="columnContainer">
      <div className='column'>
        <h2>Todo</h2>
        <div className='columnWrapper'>
          {/* {tasks.map(task => task.columnName === 'Todo' ? )} */}
          {tasks.map(task => task.columnName === 'Todo' &&
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
                {task.assignees.map(user => <img key={user.id} src={user.imageUrl} alt="Image" />)}
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
      {columns.map(column =>
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
      title={columnMenu ? 'Close' : 'New column'}
      onClick={() => setColumnMenu(!columnMenu)}
      style={{transform: `rotate(${columnMenu ? 135 : 0}deg)`}}
      >+</h1>
    </div>
    </>
  ); 
}

export default Colums;