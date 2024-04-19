import './App.css';
import Home from './components/main/Home';
import Login from './components/login/Login';
import About from './components/about/About';
import TodoColumn from './components/TodoColumn'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id="AppMainContainer">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path='/todo' element={<TodoColumn />} /> {}
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
