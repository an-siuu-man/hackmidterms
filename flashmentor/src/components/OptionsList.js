import React from 'react';
import ReactDOM from 'react-dom';


export default function OptionsList ({position }) {
    const { x, y } = position;
    return ReactDOM.createPortal(
        <div className={`options-list absolute z-50 `} style={{ top: y, left: x }}>
            <ul className={`bg-white min-w-[100px] w-[fit-content] text-black rounded-[8px] py-[2px] bg-[#ebeff0] shadow-xl`}>
                <li className='text-center cursor-pointer text-lg text-left hover:text-[#217efb] rounded-[8px] hover:bg-white m-[5px] p-[2px] duration-[150ms]'
                    onClick={(e) => {  e.stopPropagation(); console.log('Edit') }}>
                    Edit
                </li>
                <li className='text-center cursor-pointer text-lg text-left hover:text-[#217efb] rounded-[8px] hover:bg-white m-[5px] p-[2px] duration-[150ms]'
                    onClick={(e) => { e.stopPropagation(); console.log('Move To') }}>
                    Move To
                </li>
                <li className='text-center cursor-pointer text-lg text-left text-[red] rounded-[8px] hover:bg-white m-[5px] p-[2px] duration-[150ms]'
                    onClick={(e) => { e.stopPropagation(); console.log('Delete') }}>
                    Delete
                </li>
            </ul>
        </div>,
        document.body
    );


}

