import { Link, useLocation } from 'react-router-dom';
import hmtLogo from '../assets/hmt_logo.png';
export default function Navbar() {

        const location = useLocation();

        
        const isCurrentPath = (path) => {
          return location.pathname === path ? 'text-[#1E90FF]' : 'hover:text-[#FF6b6b]';
        }
      
        return (
          <nav className="w-full flex justify-between py-[20px] px-[10px] font-[Poppins]">
            <div className="flex items-center"><img className='h-[80px] w-[80px] rounded-[50%] ' src={hmtLogo} alt='App logo'/>
                <h1 className='text-3xl font-[Poppins] font-bold px-[10px]'>HackMidTerms</h1>
            </div>
            <ul className="flex items-center">
                <li className={`px-[40px] text-[22px] font-[500]`}>
                    <Link className={`${isCurrentPath('/dashboard')} transition duration-[200ms]`} to='/dashboard' >
                        Dashboard
                    </Link>
                </li>

                <li className={`px-[40px] text-[22px] font-[500]`}>
                    <Link className={` ${isCurrentPath('/videoplayer')} transition duration-[200ms]`} to='/videoplayer'>
                        Video Player
                    </Link>
                </li>
                <li className={`px-[40px] text-[22px] font-[500]`}>
                    <Link className={`${isCurrentPath('/aboutus')} transition duration-[200ms]`} to='/aboutus'>
                      About Us
                    </Link>
                </li>
                <li className={`px-[40px] text-[22px] font-[500]`}>
                  <p>Log Out</p>  
                </li>

            </ul>
          </nav>
        );
      };
