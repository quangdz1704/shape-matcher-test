// your types here
export type Shape = 'circle' | 'square' | 'triangle';
export type Color = 'red' | 'green' | 'blue';

export interface CellType {
  id: number;
  shape: Shape;
  color: Color;
  isOpen: boolean;
  isMatched: boolean;
}

export enum GameState {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
}
