
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
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip} style={{ position: 'relative', zIndex: '0' }}>
            <div className={`flashcard-inner`}>
                <div className={`flashcard-front`} onMouseEnter={handleOptions} onMouseLeave={handleOptions}>
                    <h1 className='text-center w-[100%]'>Front of the flashcard</h1>
                    <div className={`block min-w-[20px] ml-[auto] mb-[auto] hover:text-black relative`} 
                         onClick={ (e) => {e.stopPropagation()}}
                        style={{zIndex: 1 }}>
                        
                        <div className={`${showOptions ? 'opacity-1' : 'opacity-0 '} duration-[150ms] flashcard-options flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} 
                            onClick={ (e) => {e.stopPropagation(); handleOptionsList();}}>
                            ...
                        </div>

                        <div className={`${showOptionsList ? '' : 'hidden'} options-list absolute left-[20px]`} 
                             style={{ zIndex: '1000' }}>  {/* Increased zIndex */}
                            <ul className={`bg-white min-w-[100px] w-[fit-content] font-[Poppins] rounded-[8px] py-[2px] bg-white border-[1.5px] border-black`}>
                                <li className='text-center text-lg text-left text-[#333333] hover:text-[#217efb] rounded-[8px] hover:bg-white m-[5px] p-[2px]'
                                onClick={() => {console.log('Edit')}}>
                                    Edit
                                </li>
                                <li className='text-center text-lg text-left text-[#333333] hover:text-[#217efb] rounded-[8px] hover:bg-white m-[5px] p-[2px]'
                                onClick={() => {console.log('Move To')}}>
                                    Move To
                                </li>
                                <li className='text-center text-lg text-left text-[#ff6b6b] hover:text-[red] font-[600] rounded-[8px] hover:bg-white m-[5px] p-[2px]'
                                onClick={() => {console.log('Delete')}}>
                                    Delete
                                </li>
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
