import React, { useReducer} from 'react';
import './App.css';
import Grid from "./components/field";

const grid = Array(7)
    .fill(null)
    .map(_ => Array(6).fill("white"));

function checkLine(a,b,c,d){
  return((a !== "white") && (a ===b) && (a === c) && (a === d))
}

function reducer(state, action){
  switch(action.type){

    case "fill_cell":

    for(let i = action.rowArray.length-1; i>=0; i--){
      if(action.rowArray[i] === "white"){
        console.log(action.rowArray[i] )
        action.rowArray[i] = state.selectedColor;
        return{
          ...state,
          ...state.grid,
          selectedColor: state.selectedColor === "red" ? state.selectedColor = "yellow"  : state.selectedColor = "red"
        }
      }if(i===0){
        return{
          ...state,
          ...state.grid 
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
        winner: "",
        selectedColor: "red",
      }

      case "check_winner":

        let grid = [...state.grid];

        //check column
        for(let c = 0; c<7; c++){
          for(let r = 0; r<3; r++){
            if(checkLine(grid[c][r], grid[c][r+1], grid[c][r+2], grid[c][r+3])){
              console.log(grid[c][r], "won");
              return{
                ...state,
                winner: grid[c][r] + " won!",
              }
            }
          }
        }
        //check row
        for(let c = 0; c<4; c++){
          for(let r = 0; r<6; r++){
            if(checkLine(grid[c][r], grid[c+1][r], grid[c+2][r], grid[c+3][r])){
              return{
                ...state,
                winner: grid[c][r] + " won!",
            }
          }
        }
      }

      //check down right
      for(let c=0; c<4; c++){
        for(let r=0; r<3; r++){
          if(checkLine(grid[c][r], grid[c+1][r+1], grid[c+2][r+2], grid[c+3][r+3])){
            return{
              ...state,
              winner: grid[c][r] + " won!",
            }
          }
        }
      }

      //check down left
      for(let c=0; c<4; c++){
        for(let r=3; r<6; r++){
          if(checkLine(grid[c][r], grid[c+1][r-1], grid[c+2][r-2], grid[c+3][r-3])){
            return{
              ...state,
              winner: grid[c][r] + " won!",
            }
          }
        }
      }
    
      //check draw
      for(let column of grid){
        for(let cell of column){
          if(cell === "white"){
            return{
              ...state,
                winnner: "",
            }
          }
        }
      }

      return{
        ...state,
        winner: "Draw!",
      }
  }
}


const App = ()=>{
const [state, dispatch] = useReducer(reducer, { selectedColor: "red", draw: false, winner: "", grid});

  return (
    <div className="App">
      <main className="App__main">
        <div className="App__main__container">
          <h1>{state.winner}</h1>
          <button onClick={()=> dispatch({type: "reset_grid"})}>Restart</button>
        </div>
        <div className="App__main__field">
          <Grid grid={state.grid} onClickCell={(row, column, rowArray) => {
              if(state.winner ===""){
                dispatch({ type: "fill_cell", row, column, rowArray });
                dispatch({type: "check_winner"});
              }
            } 
          }></Grid>
        </div>
      </main>
    </div>
  );
}


export default App;
