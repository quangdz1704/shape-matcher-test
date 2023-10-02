import React from 'react';
import { CellType } from '../types';
import './Cell.css';

interface CellProps {
  // Your code here
  cell: CellType;
  onClick?: () => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <div
      style={{ color: cell.color}}
      className={`cell ${cell.isOpen ? 'open' : ''} ${cell.isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      {/* ${cell.color} */}
      {cell.isOpen && <div className={`shape ${cell.shape} `} />}
    </div>
  );
};

export default Cell;

