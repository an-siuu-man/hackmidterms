import FlashCard from "../components/FlashCard";
import { useEffect } from "react";
export default function Dashboard() {
    
    useEffect(() => {
        const dashboard = document.querySelector('.dashboard');
        if (dashboard) {
            dashboard.classList.add('fade-in-general');
        }
    }, []);


    return (
        <div className = 'dashboard'>
            <div className='flex space-x-[30px]'> {/* Added horizontal space */}
                <FlashCard />
                <FlashCard />
            </div>
        </div>
    );
}
