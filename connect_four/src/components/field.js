import React from 'react';
import '../App.css';



let Grid = (props) => {
    return (
        <div className="Grid">
            {props.grid.map((row, i) => {

                let id = '_' + Math.random().toString(36).substr(2, 9);

                return(
                    <div className="Grid__row" key={id}>
                        {row.map((cell, j) =>{
      
                            let id = '_' + Math.random().toString(36).substr(2, 9);
                            
                            return(
                                <div className="Grid__row__cell emptyCell" key={id} style={{ background: cell }} onClick={(()=>props.onClickCell(j, i, row))}></div>
                            )
                        })}
                    </div>
                )
            })};
        </div>
    )
}

export default Grid;