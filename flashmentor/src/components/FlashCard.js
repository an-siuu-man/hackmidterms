import { useState } from 'react';


export default function FlashCard(props) {


    const [flipped, setFlipped] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showOptionsList, setShowOptionsList] = useState(false);
    
    const handleFlip = () => {
        setFlipped(!flipped);
        if (!flipped) {
            setShowOptionsList(false);
        }
    }

    const handleOptions = () => {
        setShowOptions(!showOptions);
    }
    
    const handleOptionsList = () => {
        setShowOptionsList(!showOptionsList);
    }



    return (
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className={`flashcard-inner`}>
                <div className={`flashcard-front`} onMouseEnter={handleOptions} onMouseLeave={handleOptions}>
                    <h1 className='text-center w-[100%]'>Front of the flashcard</h1>
                    <div className={`block min-w-[20px] ml-[auto] mb-[auto] hover:text-black relative`} onClick={(e) => {e.stopPropagation(); console.log('hello')}}>
                        <div className={` ${showOptions ? 'opacity-1' : 'opacity-0'} duration-[150ms] flashcard-options flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                        onClick={handleOptionsList}>
                        ...
                        </div>
                        <div className={`${showOptionsList ? '' : 'hidden'} options-list absolute left-[20px]`}>
                            <ul className={`bg-white min-w-[100px] w-[fit-content] text-black rounded-[8px] border-[2px] border-[black]`}>
                                <li className='text-center text-lg text-left hover:text-[#217efb] m-[5px] p-[5px]'>Edit</li>
                                <li className='text-center text-lg text-left hover:text-[#217efb] m-[5px] p-[5px]'>Move To</li>
                                <li className='text-center text-lg text-left text-[red] m-[5px] p-[5px]'>Delete</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`flashcard-back`}>
                    <h1 className='text-center'>Back</h1>
                </div>
            </div>
        </div>
    );
}