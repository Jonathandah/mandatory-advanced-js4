import React, { useReducer, useState, useEffect } from 'react';
import './App.css';
import Grid from "./components/field";

const grid = Array(7)
    .fill(null)
    .map(_ => Array(6).fill("white"));

console.log(grid);
//grid[0][5] = "black";


function reducer(state, action){
  switch(action.type){

    case "fill_cell":
    let grid =[...state.grid];

    for(let i = action.rowArray.length-1; i>=0; i--){

      if(action.rowArray[i] === "white"){
        console.log(action.rowArray[i] )
        action.rowArray[i] = state.selectedColor;
        return{
          ...state,
          grid,
          selectedColor: state.selectedColor === "red" ? state.selectedColor = "yellow"  : state.selectedColor = "red"
        }
      }
    }

    case "reset_grid":
      let newGrid =  Array(7)
      .fill(null)
      .map(_ => Array(6).fill("white"));

      return {
        ...state,
        grid: newGrid,
      }
    //får fel för att jag inte returnerar något när en cell inte är vit. Vad ska jag returnera?


    //gamla men kunde inte få färgen att landa längst ner
    /*
    if(grid[action.column][action.row]==="white"){
      grid[action.column][action.row] = state.selectedColor;
      return{
        ...state,
        grid,
        selectedColor: state.selectedColor === "red" ? state.selectedColor = "yellow"  : state.selectedColor = "red"
      };
    }else{
      return{
        ...state,
        grid,
      }
    }
    */
  }
}


const App = ()=>{
const [state, dispatch] = useReducer(reducer, { selectedColor: "red", grid});
const [winner, updateWinner] = useState(""); //kan ha winner i reducer

useEffect(() => {
  checkColumn();
  checkRow();
  checkDownRight();
  checkDownLeft();
}, [state]);


function checkLine(a,b,c,d){
  return((a !== "white") && (a ===b) && (a === c) && (a === d))
}


function checkColumn(){
  let grid = [...state.grid];
  for(let c = 0; c<7; c++){
    for(let r = 0; r<3; r++){
      if(checkLine(grid[c][r], grid[c][r+1], grid[c][r+2], grid[c][r+3])){
        console.log(grid[c][r], "won");
        updateWinner(grid[c][r]);
      }
    }
  }
}
function checkRow(){
  let grid = [...state.grid];
  for(let c = 0; c<4; c++){
    for(let r = 0; r<6; r++){
      if(checkLine(grid[c][r], grid[c+1][r], grid[c+2][r], grid[c+3][r])){
        console.log(grid[c][r], "won");
      }
    }
  }
}

function checkDownRight(){
let grid = [...state.grid];
  for(let c=0; c<4; c++){
    for(let r=0; r<3; r++){
      if(checkLine(grid[c][r], grid[c+1][r+1], grid[c+2][r+2], grid[c+3][r+3])){
        console.log(grid[c][r], "won");
      }
    }
  }
}

function checkDownLeft(){
  let grid = [...state.grid];
    for(let c=0; c<4; c++){
      for(let r=3; r<6; r++){
        if(checkLine(grid[c][r], grid[c+1][r-1], grid[c+2][r-2], grid[c+3][r-3])){
          console.log(grid[c][r], "won");
        }
      }
    }
  }
//vinnaren ges ut en runda för sent, varflör?



//använd dispatch för att tömma gridden.
function restart(){
  const grid = Array(7)
    .fill(null)
    .map(_ => Array(6).fill("white"));

    state.grid = grid;
    console.log(state.grid);
}

  return (
    <div className="App">
      <main className="App__main">
        <p>{winner}</p>
        <button onClick={()=> dispatch({type: "reset_grid"})}>Restart</button>
        <div className="App__main__field">
          <Grid grid={state.grid}  onClickCell={(row, column, rowArray) => {
            dispatch({ type: "fill_cell", row, column, rowArray });

            }
            
          }></Grid>
        </div>
      </main>
    </div>
  );
}


export default App;
