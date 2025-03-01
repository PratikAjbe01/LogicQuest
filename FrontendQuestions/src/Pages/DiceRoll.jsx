import React, { useState } from 'react'
import NO1 from '../assets/Dice/NO1.svg';
import NO2 from '../assets/Dice/NO2.svg';
import NO3 from '../assets/Dice/NO3.svg';
import NO4 from '../assets/Dice/NO4.svg';
import NO5 from '../assets/Dice/NO5.svg';
import NO6 from '../assets/Dice/NO6.svg';
function DiceRoll() {
    const dice=[NO1,NO2,NO3,NO4,NO5,NO6];
    const [dice1,setDice1]=useState(NO1);
    const [dice2,setDice2]=useState(NO2);
    const RollUp=()=>{
        const num1=Math.round(Math.random()*6);
        const num2=Math.round(Math.random()*6);
        setDice1(dice[num1]);
        setDice2(dice[num2]);
      
    }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold mb-2">Dice Roll Simulator</h1>
      <p className="text-gray-600">
        Roll two dice and display random numbers between 1 and 6. Click the
        button to roll!
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <div className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
        <img src={dice1} alt="Dice 1" className="h-24 w-24 md:h-32 md:w-32" />
      </div>
      <div className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
        <img src={dice2} alt="Dice 2" className="h-24 w-24 md:h-32 md:w-32" />
      </div>
    </div>
    <div className="text-center mb-4">
    <button
        onClick={RollUp}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Roll Dice!
      </button>
    </div>
  </main>
  )
}

export default DiceRoll
