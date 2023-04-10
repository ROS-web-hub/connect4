import React from 'react';
import {Row} from "./interfaces/Row";
import {Column} from "./interfaces/Column";
import GameColumn from "./GameColumn";

interface Props{
    row: Row
    updateBoard: (columnindex:number ) => void
}
const GameRow: React.FC<Props> = ({row, updateBoard}: Props): JSX.Element => {
    return (
        <tr>
            {row.columns.map((column:Column, i: number): JSX.Element => (<GameColumn columnIndex={i} col={column} key={i}
                                                                                        updateBoard={updateBoard}/>))}
        </tr>
    );
}

export default GameRow;