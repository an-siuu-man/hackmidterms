import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import PageButton from './components/PageButton';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import AboutUs from './pages/AboutUs';
import ServerTest from './pages/ServerTest';


function App() {


  return (
    <Router>
    <div className="flex justify-center">
      <div className="w-[90%]">
      <Navbar />
      <div className="flex justify-center">
      <PageButton text='Dashboard' type='secondary'/>
      <PageButton text='Video Player' type='primary'/>
      <PageButton text='About Us' type='secondary'/>
      </div>
    </div>
    </div>
    <Routes>
      <Route path='/server-test' element={<ServerTest />} />
    </Routes>
    </Router>
  );
}


export default App;




