import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import PageButton from './components/PageButton';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import AboutUs from './pages/AboutUs';
import FlashCard from './components/FlashCard';
import Dashboard from './pages/Dashboard';


function App() {


  return (
    <Router>
    <div className="flex justify-center">
      <div className="w-[95%]">
      <Navbar />
    </div>
    </div>
    <div className="flex justify-center">
    <div className="w-[95%]">
    <Routes>

          <Route exact path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </div>
    </div>
    </Router>
  );
}


export default App;




