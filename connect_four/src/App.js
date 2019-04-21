import React, { useReducer } from 'react';
import './App.css';
import Grid from "./components/field";

const grid = Array(7)
    .fill(null)
    .map(_ => Array(6).fill("white"));

console.log(grid);



function reducer(state, action){
  switch(action.type){

    case "fill_cell":
    let grid =[...state.grid];

    console.log(action.rowArray);
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
  function checkColumn(){
    for(let column of grid){
      for(let i = column.length-1; i>=0; i--){
        if(column[i]){

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
          <Grid grid={grid}  onClickCell={(row, column, rowArray) => {
            dispatch({ type: "fill_cell", row, column, rowArray })

            }
            
          }></Grid>
        </div>
      </main>
    </div>
  );
}


export default App;
