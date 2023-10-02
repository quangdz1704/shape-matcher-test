import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { Shape, Color, GameState, CellType } from "../types";
import "./Board.css";

const Board: React.FC = () => {
  // states...
  const [gameState, setGameState] = useState<GameState>(GameState.NotStarted);
  const [cells, setCells] = useState<CellType[]>([]);
  const [selectedCells, setSelectedCells] = useState<CellType[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  console.log('gameState', gameState);


  useEffect(() => {
    // Initialize the game board with random shapes and colors
    const generateRandomCells = (): CellType[] => {
      const shapes: Shape[] = ["circle", "square", "triangle"];
      const colors: Color[] = ["red", "green", "blue"];
      const allPairs: CellType[] = [];

      for (let i = 0; i < 8; i++) {
        const shape = shapes[i % 3];
        const color = colors[Math.floor(i / 3)];
        const cell: CellType = {
          id: i,
          shape,
          color,
          isOpen: false,
          isMatched: false,
        };
        allPairs.push({ ...cell });
        allPairs.push({ ...cell, id: i + 8 }); // Create a matching pair
      }

      // Shuffle the pairs
      return allPairs.sort(() => Math.random() - 0.5);
    };

    setCells(generateRandomCells());
    setGameState(GameState.NotStarted);
    setAttempts(0);
  }, []);

  const handleCellClick = (index: number) => {
    setGameState(GameState.InProgress)
    console.log('index', index)

    if (selectedCells.length === 2) {
      // If two cells are already selected, do nothing
      return;
    }

    const clickedCell = cells[index];

    const updatedCells = cells.map((cell) =>
      cell.id === clickedCell.id ? { ...cell, isOpen: true } : cell
    );

    setCells(updatedCells);
    setSelectedCells([...selectedCells, clickedCell]);

    if (selectedCells.length === 1) {
      // Check if the selected cells match
      setAttempts(attempts + 1);

      if (
        selectedCells[0].shape === clickedCell.shape &&
        selectedCells[0].color === clickedCell.color
      ) {

        console.log('selectedCells', selectedCells)
        console.log('clickedCell', clickedCell)
        // If match, mark cells as matched
        setTimeout(() => {
          const updatedCells = cells.map((cell) =>
            cell.id === clickedCell.id || cell.id === selectedCells[0].id
              ? { ...cell, isMatched: true, isOpen: true }
              : cell
          );
          setCells(updatedCells);
          setSelectedCells([]);
        }, 500);
      } else {
        // If not a match, close the cells after a delay
        setTimeout(() => {
          const updatedCells = cells.map((cell) =>
            cell.id === clickedCell.id || cell.id === selectedCells[0].id
              ? { ...cell, isOpen: false }
              : cell
          );
          setCells(updatedCells);
          setSelectedCells([]);
        }, 1000);
      }
    }
  };

  console.log('cells', cells)
  useEffect(() => {
    // Check for game completion
    const isNotCompleteCell = cells.find((cell) => cell.isMatched === false);

    console.log('first', isNotCompleteCell)
    if (cells.length > 0 && !isNotCompleteCell) {
      console.log('1107', 1107)
      setGameState(GameState.Completed);
    }
  }, [cells]);

  return (
    <>
      {gameState === GameState.NotStarted && (
        <div className="start-message">Click to start!</div>
      )}
      {gameState === GameState.Completed && (
        <div className="completion-message">
          Game completed in {attempts} attempts!
        </div>
      )}
      <div className="board">
        {cells.map((cell, index) => (
          <Cell
            key={cell.id}
            cell={cell}
            onClick={() =>
              cell.isOpen || cell.isMatched ? undefined : handleCellClick(index)
            }
          />
        ))}
      </div>
    </>
  );
};

export default Board;
