import './App.css'
import Home from './components/home/Home';
import Login from './components/login/Login';
import About from './components/about/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './components/admin/Admin';
import TaskList from './components/taskList/TaskList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/' element={<Home />} />
        <Route path='/taskList' element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;