export interface PuzzleStateData {
  imageData?: {
    src: string;
    tileSize: number;
    tiles: { x: number; y: number; width: number; height: number }[];
  };
}

export type PuzzleState = (number | null)[] & PuzzleStateData; // 0表示空白格，一维数组表示3x3棋盘

export interface Position {
  row: number;
  col: number;
}

export interface Solution {
  steps: PuzzleState[];
  totalCost: number;
  exploredNodes: number;
}

export interface PuzzleConfig {
  size: number;
  initial: PuzzleState;
  goal: PuzzleState;
}

export interface Move {
  from: Position;
  to: Position;
}

export interface PuzzleStats {
  inversionCount: number;
  isSolvable: boolean;
  estimatedSteps: number;
} 