import { useState } from "react";
import { addTask } from "../../features/taskSlice";
import { useDispatch } from "react-redux";
import Colums from "./Colums";

const Home = () => {
  const [menu, setMenu] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [endDate, setEndDate] = useState('');
  const [columnName, setColumnName] = useState('');
  const columns = ['Todo', 'Tasks', 'In Progress', 'Done'];
  const dispatch = useDispatch();

  const prepareAdd = () => {
    const newTask = {
      title: title,
      content: content,
      endDate: endDate,
      columnName: columnName
    }
    dispatch(addTask(newTask));
    setMenu(false);
  }

  return (
    <div id='homeMainContainer'>
      <header>Header</header>
      <main>
        <h1
        id='addNewTaskBtn'
        onClick={() => setMenu(!menu)} style={ menu ? {transform: 'rotate(135deg)', top: '180px', left: '50px'} : {transform: 'rotate(0deg)', top: '100px', left: '0'}}
        title={menu ? 'Close' : 'Add Task'}
        >+</h1>
        {menu &&
        <div id="newTaskForm">
          <div>
            <p style={title ? {transform: 'translate(2px, -70%) scale(0.8)'} : {transform: 'translate(12px, 50%) scale(1)'}}>Task Title</p>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <p style={content ? {transform: 'translate(2px, -70%) scale(0.8)'} : {transform: 'translate(12px, 50%) scale(1)'}}>Task Content</p>
            <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
          </div>
          <div>
            <p style={endDate ? {transform: 'translate(2px, -70%) scale(0.8)'} : {transform: 'translate(12px, 50%) scale(1)'}}>Task EndDate</p>
            <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div>
          <p style={columnName ? {transform: 'translate(2px, -70%) scale(0.8)'} : {transform: 'translate(12px, 50%) scale(1)'}}>Column Name</p>
            <input type="text" value={columnName} onChange={() => {}} />
            <select value={columnName} onChange={e => setColumnName(e.target.options[e.target.selectedIndex].value)}>
            <option value={''}>Choose Column</option>
            {columns.map(column =>
              <option value={column} key={column}>{column}</option>
            )}
            </select>
          </div>
          {title.trim() && content.trim() && endDate.trim() && columnName.trim() &&
          <button onClick={prepareAdd}>Add Task</button>}
        </div>}
        <Colums />
      </main>
    </div>
  )
}

export default Home;