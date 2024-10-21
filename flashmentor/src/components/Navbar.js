import { Link, useLocation } from 'react-router-dom';
import hmtLogo from '../assets/hmt_logo.png';
export default function Navbar() {

        const location = useLocation();

        
        const isCurrentPath = (path) => {
          return location.pathname === path ? 'text-[#1E90FF]' : 'hover:text-[#FF6b6b]';
        }
      
        return (
          <nav className="w-full flex justify-between p-[10px]">
            <div className="flex items-center"><img className='h-[80px] w-[80px] rounded-[50%] ' src={hmtLogo} alt='App logo'/>
                <h1 className='text-3xl font-[Poppins] font-bold px-[10px]'>HackMidTerms</h1>
            </div>
            <ul className="flex items-center">
                <li className={`px-10 text-[22px] font-[400]`}>
                    <Link className={`${isCurrentPath('/')} transition duration-[200ms]`} to='/' >
                        Dashboard
                    </Link>
                </li>

                <li className={`px-10 text-[22px] font-[400]`}>
                    <Link className={` ${isCurrentPath('/videoplayer')} transition duration-[200ms]`} to='/videoplayer'>
                        Video Player
                    </Link>
                </li>
                <li className={`px-10 text-[22px] font-[400]`}>
                    <Link className={`${isCurrentPath('/aboutus')} transition duration-[200ms]`} to='/aboutus'>
                      About Us
                    </Link>
                </li>
                
            </ul>
          </nav>
        );
      };
