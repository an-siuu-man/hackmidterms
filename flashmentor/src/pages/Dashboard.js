import FlashCard from "../components/FlashCard";

export default function Dashboard() {

    return (
        <div className="">
            <div className='flex space-x-[60px]'> {/* Added horizontal space */}
                <FlashCard />
                <FlashCard />
            </div>
        </div>
    );
}
