import React, { useReducer } from 'react';
import './App.css';
import Grid from "./components/field";

const grid = Array(6)
    .fill(null)
    .map(_ => Array(7).fill("white"));

console.log(grid);


function reducer(state, action){
  switch(action.type){

    case "fill_cell":
    let grid =[...state.grid];

    console.log(action.row);
    console.log(action.column);
    console.log( grid[action.row][action.column]);
    if(grid[action.row][action.column]==="white"){
      grid[action.row][action.column] = state.selectedColor;
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
  }
}

const App = ()=>{
const [state, dispatch] = useReducer(reducer, { selectedColor: "red", grid });

//går inte att köra state.grid?

  return (
    <div className="App">
      <main className="App__main">
        <div className="App__main__field">
          <Grid grid={grid} onClickCell={(row, column) => {
            dispatch({ type: "fill_cell", row, column })
          
            }
            
          }></Grid>
        </div>
      </main>
    </div>
  );
}


export default App;
