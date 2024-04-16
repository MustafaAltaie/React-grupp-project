import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newColumnHandler } from "../../features/columnSlice";
import Column from "./Column";

const Colums = () => {
  const [columnMenu, setColumnMenu] = useState(false);
  const [newColumn, setNewColumn] = useState('');
  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns.columns);

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
        <div className='columnWrapper'></div>
      </div>
      {columns.map(column => 
      <Column key={column} column={column} />
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