import React from 'react';
import axios from 'axios';
import {Column} from "./interfaces/Column";


interface Props {
    columnIndex: number
    col: Column
    updateBoard: (columnIndex: number) => void
}

const GameColumn: React.FC<Props> = ({columnIndex, col, updateBoard}: Props): JSX.Element => {
    let tileStatus = "open";

    if(col.player === 1){
        tileStatus = "player1"
    } else if (col.player === 2){
        tileStatus = "player2"
    }
    return (
        <td>
            <div className="tile" onClick={() => fetchData(columnIndex)}>
                <div className={[tileStatus, "circle"].join(" ")}>
                    
                </div>
            </div>
        </td>
    );
}

// Make a GET request to the API endpoint
async function fetchData(this: any, columnIndex:number)  {
    try {
      const response = await axios.get('http://localhost:8000/my-api/' + columnIndex);
      this.updateBoard(columnIndex);
      return   response.data;
      console.log(response.data);
    } catch (error) {
      return 1;
    }
  }
  

export default GameColumn;