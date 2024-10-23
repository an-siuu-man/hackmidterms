import Navbar from "../components/Navbar";
import PageButton from "../components/PageButton";
import FlashCard from "../components/FlashCard";


export default function Dashboard() {



    return (
        <div>
            <div className='flex'>
                <FlashCard />
                <FlashCard />
            </div>
        </div>
    );
}