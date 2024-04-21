import { useState } from "react";
import { addTask } from "../../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import Colums from "./Colums";
import Header from "./Header";
import Settings from "./Settings";

const Home = () => {
  const [menu, setMenu] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [endDate, setEndDate] = useState('');
  const [columnName, setColumnName] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState('');
  const columns = useSelector(state => state.columns.columns);
  const users = useSelector(state => state.login.loginDatabase);
  const dispatch = useDispatch();

  const prepareAdd = () => {
    const newTask = {
      title: title,
      content: content,
      endDate: endDate,
      columnName: columnName,
      assignees: assignees,
      priority: priority
    }
    dispatch(addTask(newTask));
    setMenu(false);
  }

  const handleAssignees = (user) => {
    assignees.includes(user) ?
    setAssignees(assignees.filter(assignee => assignee != user))
    : setAssignees([...assignees, user]);
  }

  return (
    <div id='homeMainContainer'>
      <Header />
      <main>
        <h1
        id='addNewTaskBtn'
        onClick={() => setMenu(!menu)} style={ menu ? {transform: 'rotate(135deg)', top: '130px', left: '50px'} : {transform: 'rotate(0deg)', top: '100px', left: '0'}}
        title={menu ? 'Close' : 'New Task'}
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
              <option value={'Todo'}>Todo</option>
              {columns.map(column =>
              <option value={column} key={column}>{column}</option>
            )}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.options[e.target.selectedIndex].value)}>
              <option value={null}>Priority</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div>
            <div className='newTaskAssignees'>
              {users.map(user =>
              <p
              key={user.id}
              onClick={() => handleAssignees(user)}
              style={assignees.includes(user) ? {background: '#070'} : {background: '#333'}}
              >{user.userName}</p>)}
            </div>
          </div>
          <button
          style={
            (title.trim() && content.trim() && endDate.trim() && columnName.trim())
            ? { background: '#06f', pointerEvents: 'unset' }
            : { background: '#aaa', pointerEvents: 'none' }}
          onClick={prepareAdd}>Add Task</button>
        </div>}
        <Colums />
        <Settings />
      </main>
    </div>
  )
}

export default Home;