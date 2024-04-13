import './App.css'
import Home from './components/login/Home';
import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;