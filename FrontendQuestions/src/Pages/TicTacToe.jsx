

import { useState } from 'react'


function TicTacToe() {
  const [grid,setGrid]=useState(new Array(9).fill(''));
  const [index,setInd]=useState(null);
  const [currTurn,setCurrTurn]=useState('X');
  const [winner,setWinner]=useState(null);
  const [totalturn,setTotalTurn]=useState(9);
  const [draw,setDraw]=useState(true);
  const checkWinner=(array)=>{
if((array[0]=='X'&&array[1]=='X'&&array[2]=='X')||(array[3]=='X'&&array[4]=='X'&&array[5]=='X')||(array[6]=='X'&&array[7]=='X'&&array[8]=='X')||(array[0]=='X'&&array[4]=='X'&&array[8]=='X')||(array[2]=='X'&&array[6]=='X'&&array[4]=='X')||(array[0]=='X'&&array[3]=='X'&&array[6]=='X')||(array[1]=='X'&&array[4]=='X'&&array[7]=='X')||(array[2]=='X'&&array[5]=='X'&&array[8]=='X')){
setWinner('winner is X');
setInd(null);
return;
}
if((array[0]=='O'&&array[1]=='O'&&array[2]=='O')||(array[3]=='O'&&array[4]=='O'&&array[5]=='O')||(array[6]=='O'&&array[7]=='O'&&array[8]=='O')||(array[0]=='O'&&array[4]=='O'&&array[8]=='O')||(array[2]=='O'&&array[6]=='O'&&array[4]=='O')||(array[0]=='O'&&array[3]=='O'&&array[6]=='O')||(array[1]=='O'&&array[4]=='O'&&array[7]=='O')||(array[2]=='O'&&array[5]=='O'&&array[8]=='O')){
  setWinner('winner is O');
  setInd(null);
  return;
  }
  setDraw(true);
  for(let i=0;i<array.length;i++){
    if(array[i]==''){
    setDraw(false);
    }
  }

  }
  const handleClick=(ind)=>{

    
    if(winner!=null){
      return;
    }
   
    setInd(ind);
  
    (currTurn=='X')?setCurrTurn('O'):setCurrTurn('X');
    const array=[...grid];
    array[ind]=currTurn;
    setTotalTurn(totalturn-1);
    checkWinner(array);
if(totalturn==0&&winner==null){
  setDraw(true);
        checkWinner(array);
        if(draw && winner==null){
            setWinner('This match is Draw');
        }
}
 
    setGrid(array);
   
  }


  return (
<main className="flex flex-col min-h-screen">
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold mb-2">Tic-Tac-Toe</h1>
        <p className="text-gray-600">
          A classic game where players take turns marking spaces in a 3x3 grid.
          The player who succeeds in placing three of their marks in a horizontal,
          vertical, or diagonal row wins the game. If all spaces are filled and
          no player has won, the game is a draw.
        </p>
      </div>
      <div className="flex justify-center items-center flex-col flex-grow">
        <div className="grid grid-cols-3 gap-2">
          {grid.map((value, ind) => (
            <div
              key={ind}
              className={`h-20 w-20 border flex items-center justify-center text-3xl font-bold ${
                ind === index
                  ? 'bg-blue-200 transition-colors duration-300 hover:bg-blue-300'
                  : 'bg-gray-100 transition-colors duration-300 hover:bg-gray-200'
              } shadow-md rounded-lg cursor-pointer`}
              onClick={() => handleClick(ind)}
            >
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-lg">
          Current Turn: {currTurn}
        </div>
        {winner && <div className="mt-2 text-xl font-semibold">{winner}</div>}
      </div>
    </main>
  )
}

export default TicTacToe
