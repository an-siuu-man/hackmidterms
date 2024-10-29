import { useEffect } from 'react';
import PageButton from "../components/PageButton";
import { useState } from "react";
export default function Home() {
    
    useEffect(() => {
        const homeCard = document.querySelector('.home-card');
        const homeCardTwo = document.querySelector('.home-card-two');
        const leftContainer = document.querySelector('.left-container');
        if (homeCard && homeCardTwo) {
            homeCard.classList.add('fade-in');
            homeCardTwo.classList.add('fade-in-two');
        }

        if (leftContainer) {
            leftContainer.classList.add('fade-in-three');
        }

    }, []);

    return (
        <div className='flex justify-between'>
            <div className="left-container w-[50%]">
                <h1 className="font-[Poppins] text-5xl mt-20 mb-10">HackMidTerms</h1>
                <p className="font-[Poppins] text-2xl font-[300]">
                    Join us for revolutionizing online learning like never before...
                </p>
                <div className="flex justify-left my-10 space-x-8">
                    <PageButton type='primary' text="Get Started" link="/dashboard" />
                    <PageButton text="About Us" link="/aboutus" />
                </div>
            </div>
            <div className="right-container p-[5%] w-[50%]">  
                <div className="home-card-two flex justify-center items-center w-[70%] h-[300px] p-[30px] rounded-[40px] shadow-2xl cursor-default">
                    <p className="font-[Poppins] text-2xl text-white text-center font-[600]">Ready to optimize your online learning?</p>
                </div>
                <div className="home-card flex justify-center items-center w-[75%] h-[350px] p-[30px] rounded-[40px] shadow-2xl cursor-default">
                    <p className="font-[Poppins] text-2xl text-white text-center font-[600]">What is the best part of online learning?</p>
                </div>
            </div>
        </div>
    );
}
