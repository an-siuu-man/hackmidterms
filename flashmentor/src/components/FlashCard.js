import { useEffect, useState } from 'react';
import OptionsList from './OptionsList';

export default function FlashCard(props) {
    const [flipped, setFlipped] = useState(false);
    const [showOptionsList, setShowOptionsList] = useState(false);
    const [optionsListPosition, setOptionsListPosition] = useState({ x: 0, y: 0 });


    const handleContextMenu = (event) => {
        event.preventDefault();
        setOptionsListPosition({ x: event.clientX, y: event.clientY });
        setShowOptionsList(true);
    };

    const handleFlip = () => {
        setFlipped(!flipped);
        if (!flipped) {
            setShowOptionsList(false);
        }
    };

    useEffect(() => {
        const flashcard = document.querySelector('.flashcard');

        if (flashcard) {
            flashcard.addEventListener('blur', () => {
                setShowOptionsList(false);
            }   );
        }
        
        
        document.addEventListener('click', () => {
            setShowOptionsList(false);
        });

        return () => {
            document.removeEventListener('click', () => {
                setShowOptionsList(false);
            });
        };

    }, []);

    return (
        <div className={`flashcard ${flipped ? 'flipped' : ''} `} onClick={handleFlip} onContextMenu={handleContextMenu}>
            <div className={`flashcard-inner`}>
                <div className={`flashcard-front `}>
                    <h1 className='text-center w-[100%]'>Front of the flashcard</h1>
                    {showOptionsList && <OptionsList position={optionsListPosition} />}
                </div>
                <div className={`flashcard-back`}>
                    <h1 className='text-center'>Back</h1>
                </div>
            </div>
        </div>
    );
}