import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import PageButton from './components/PageButton';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import AboutUs from './pages/AboutUs';
import FlashCard from './components/FlashCard';
import Dashboard from './pages/Dashboard';
import ServerTest from './pages/ServerTest';


function App() {


  return (
    <Router>
    <div className="flex justify-center">
      <div className="w-[90%]">
      <Navbar />
    </div>
    </div>
    <Routes>
      <Route exact path='/dashboard' element={<Dashboard />} />
      <Route exact path='/server' element={<ServerTest />} />
    </Routes>
    </Router>
  );
}


export default App;




