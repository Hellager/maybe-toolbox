import type { Position, PuzzleState, PuzzleStats } from '../types/puzzle';

// 开发模式下的日志打印
const devLog = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

// 计算逆序数
export function calculateInversionCount(state: PuzzleState): number {
  const arr = state.filter((x): x is number => x !== 0 && x !== null); // 不考虑0和null
  let count = 0;
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        count++;
      }
    }
  }
  
  return count;
}

// 检查是否可解
export function checkSolvable(state: PuzzleState): boolean {
  const initialInversion = calculateInversionCount(state);
  const targetInversion = calculateInversionCount([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  
  // 逆序数奇偶性必须一致
  return initialInversion % 2 === targetInversion % 2;
}

// 计算曼哈顿距离
export function calculateManhattanDistance(state1: PuzzleState, state2: PuzzleState): number {
  let distance = 0;
  for (let i = 0; i < state1.length; i++) {
    const value = state1[i];
    if (value === 0 || value === null) continue;
    const pos1 = getPosition(state1, value);
    const pos2 = getPosition(state2, value);
    distance += Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col);
  }
  return distance;
}

// 获取数字在状态中的位置
export function getPosition(state: PuzzleState, num: number): Position {
  const index = state.indexOf(num);
  return {
    row: Math.floor(index / 3),
    col: index % 3
  };
}

// 获取空白格位置
export function getBlankPosition(state: PuzzleState): Position {
  const index = state.indexOf(0);
  return {
    row: Math.floor(index / 3),
    col: index % 3
  };
}

// 检查移动是否有效
export function isValidMove(current: PuzzleState, row: number, col: number): boolean {
  const blank = getBlankPosition(current);
  return (
    (Math.abs(blank.row - row) === 1 && blank.col === col) ||
    (Math.abs(blank.col - col) === 1 && blank.row === row)
  );
}

// 获取可移动的位置
export function getValidMoves(state: PuzzleState): Position[] {
  const blank = getBlankPosition(state);
  const moves: Position[] = [];
  
  const directions = [
    { row: -1, col: 0 }, // 上
    { row: 1, col: 0 },  // 下
    { row: 0, col: -1 }, // 左
    { row: 0, col: 1 }   // 右
  ];
  
  for (const dir of directions) {
    const newRow = blank.row + dir.row;
    const newCol = blank.col + dir.col;
    
    if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
      moves.push({ row: newRow, col: newCol });
    }
  }
  
  return moves;
}

// 移动数字
export function moveNumber(state: PuzzleState, row: number, col: number): PuzzleState {
  const newState = [...state];
  const blank = getBlankPosition(state);
  const blankIndex = blank.row * 3 + blank.col;
  const targetIndex = row * 3 + col;
  
  // 交换空白格和目标位置
  [newState[blankIndex], newState[targetIndex]] = [newState[targetIndex], newState[blankIndex]];
  
  return newState;
}

// 获取谜题统计信息
export function getPuzzleStats(state: PuzzleState, goal: PuzzleState): PuzzleStats {
  const inversionCount = calculateInversionCount(state);
  const isSolvable = checkSolvable(state);
  const estimatedSteps = calculateManhattanDistance(state, goal);
  
  return {
    inversionCount,
    isSolvable,
    estimatedSteps
  };
}

// 检查状态是否可解
export function isSolvable(state: PuzzleState): PuzzleStats {
  const inversionCount = calculateInversionCount(state);
  const blankRow = Math.floor(state.indexOf(0) / 3);
  const isSolvable = (inversionCount + blankRow) % 2 === 0;
  
  return {
    inversionCount,
    isSolvable,
    estimatedSteps: calculateManhattanDistance(state, [1, 2, 3, 4, 5, 6, 7, 8, 0])
  };
}

// 检查状态是否有效
export function isValidState(state: PuzzleState): boolean {
  if (state.length !== 9) return false;
  
  // 检查是否包含所有必需的数字
  const numbers = new Set(state);
  if (numbers.size !== 9) return false;
  
  // 检查是否包含0-8的所有数字
  for (let i = 0; i <= 8; i++) {
    if (!numbers.has(i)) return false;
  }
  
  return true;
}

// 生成随机状态
export function generateRandomState(): PuzzleState {
  const numbers = Array.from({ length: 9 }, (_, i) => i);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

// 生成可解的目标状态
export function generateSolvableState(): PuzzleState {
  let state: PuzzleState;
  do {
    state = generateRandomState();
  } while (!isSolvable(state).isSolvable);
  return state;
} 