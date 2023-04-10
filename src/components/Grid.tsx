import React, {useState} from 'react';
import {connect4Columns, connect4Rows} from "./constants";
import {Board} from "components/interfaces/Board";
import {Row} from "./interfaces/Row";
import GameRow from "./GameRow";
import {Column} from "./interfaces/Column";

const Grid: React.FC = (): JSX.Element => {
    const initialBoard: Board = {
        rows: Array.from({length: connect4Rows}, (i) => ({
            columns: Array.from({length: connect4Columns}, (i) => ({
                player: null
            }))
        }))
    };
    console.log(initialBoard)
    const [board, setBoard] = useState<Board>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const updateBoard = (columnIndex: number):void => {
        let boardCopy: Board = board
        let isColumnFull: boolean = true
        let rowIndex: number = 0
        for (let i: number = 5; i >= 0; i--){
            let columnPlayer: number | null = boardCopy.rows[i].columns[columnIndex].player
            if (gameOver){
                boardCopy = initialBoard
                setBoard(boardCopy)
                setCurrentPlayer(1)
                setGameOver(false)
                break;
            }
            if (!columnPlayer){
                isColumnFull = false
                rowIndex = i
                boardCopy.rows[i].columns[columnIndex].player = currentPlayer
                break;
            }
        }
        setBoard(boardCopy)
        if (!isColumnFull){
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
        }
        if (winCheck(rowIndex, columnIndex) && !gameOver){
            alert("player "+ currentPlayer+ " won.")
            setGameOver(true)
        }
    }
    const winCheck = (rowIndex:number, columnIndex:number):boolean => {
      return (
          checkHorizontal(rowIndex, columnIndex)
          || checkVertical(rowIndex, columnIndex)
          || checkDiagonalRight(rowIndex, columnIndex)
          || checkDiagonalLeft(rowIndex, columnIndex)
      );
    }
    const checkDiagonalLeft = (rowIndex:number, columnIndex:number) : boolean => {
        let connectedColumns: number = 0
        let startingColumn: number = 0
        let startingRow: number = 0
        for (let i:number = 0; i < connect4Rows; i++) {
            let column: Column = board.rows[rowIndex - i]?.columns[columnIndex+i]
            if(column){
                startingColumn = columnIndex + i
                startingRow = rowIndex + i
            }else{
                break
            }
        }
        for (let k: number = 0; k < connect4Rows ; k++) {
            let column: Column = board.rows[startingRow + k]?.columns[startingColumn - k]
            if (column){
                if (column.player === board.rows[rowIndex].columns[columnIndex].player){
                    connectedColumns++
                    if (connectedColumns >= 4){
                        return true
                    }
                }else{
                    connectedColumns = 0
                }
            }
        }
        return false
    }
    
    const checkDiagonalRight = (rowIndex: number, columnIndex: number): boolean =>{
        let connectedColumns:number = 0
        let indexDifference: number = rowIndex - columnIndex
        let startingColumn: number = 0
        let startingRow: number = 0
        if (indexDifference > 0){
            startingRow = indexDifference
        } else if (indexDifference < 0){
            startingColumn = Math.abs(indexDifference)
        }
        for (let i : number = 0; i < connect4Columns; i++) {
            let column: Column = board.rows[startingRow + i]?.columns[startingColumn+i]
            if(column){
                if (column.player === board.rows[rowIndex].columns[columnIndex].player){
                    connectedColumns++
                if (connectedColumns >= 4){
                    return true
                }
                } else {
                    connectedColumns = 0
                }
            }
        }
      return false
    }
    const checkHorizontal = (rowIndex: number, columnIndex:number): boolean => {
        let row: Row = board.rows[rowIndex]
        let connectedColumns: number = 0
        for (let i = 0; i < connect4Columns; i++) {
            if (row.columns[i].player === row.columns[columnIndex].player){
                connectedColumns++
                if (connectedColumns >= 4){
                    return true
                }
            } else {
                connectedColumns = 0
            }
        }
        return false
    }
    const checkVertical = (rowIndex: number, columnIndex: number):boolean => {
        let row: Row = board.rows[rowIndex]
        let connectedRows: number = 0
        for (let i = 0; i < connect4Rows; i++) {
            if (board.rows[i].columns[columnIndex].player === row.columns[columnIndex].player){
                connectedRows++
                if (connectedRows >= 4){
                    return true
                }
            } else {
                connectedRows = 0
            }
        }
        return false
    }
    return (
        <div>
            <table >
                <tbody>
                    {
                        board.rows.map((row: Row, i: number): JSX.Element => (
                        <GameRow row={row} updateBoard={updateBoard} key={i}/>
                    ))}
                </tbody>
            </table>
        </div>
        );
}
export default Grid;