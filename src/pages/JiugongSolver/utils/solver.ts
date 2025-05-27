import type { PuzzleState, Solution } from '../types/puzzle';
import { calculateManhattanDistance } from './puzzle';

// 开发模式下的日志打印
const devLog = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

const devWarn = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

interface SearchResult {
  result: 'found' | 'bound' | 'timeout' | 'depth_limit' | 'no_solution';
  path?: PuzzleState[];
  statesExplored?: number;
  newBound?: number;
  timeUsed?: number;
}

// interface SearchNode {
//   state: PuzzleState;
//   g: number;
//   move?: string;
// }

export function aStar(initial: PuzzleState, goal: PuzzleState): Solution | null {
  const startTime = Date.now();
  const timeout = 5000; // 5秒超时
  const maxDepth = 100; // 最大搜索深度
  let statesExplored = 0;
  let path: PuzzleState[] = [];
  let bound = calculateManhattanDistance(initial, goal);
  let shouldContinue = true;

  devLog('initial', initial);
  devLog('goal', goal);
  devLog('bound', bound);

  // 将状态转换为字符串以便于比较
  const stateToString = (state: PuzzleState): string => {
    return state.join(',');
  };

  // 获取空白格的位置
  const getBlankPosition = (state: PuzzleState): number => {
    return state.indexOf(0);
  };

  // 获取可能的移动方向
  const getPossibleMoves = (state: PuzzleState): string[] => {
    const blankPos = getBlankPosition(state);
    const blankRow = Math.floor(blankPos / 3);
    const blankCol = blankPos % 3;
    const moves: string[] = [];

    if (blankRow > 0) moves.push('up');
    if (blankRow < 2) moves.push('down');
    if (blankCol > 0) moves.push('left');
    if (blankCol < 2) moves.push('right');

    return moves;
  };

  // 应用移动并返回新状态
  const applyMove = (state: PuzzleState, move: string): PuzzleState => {
    const newState = [...state];
    const blankPos = getBlankPosition(state);
    // const blankRow = Math.floor(blankPos / 3);
    // const blankCol = blankPos % 3;

    let newPos = blankPos;
    switch (move) {
      case 'up':
        newPos = blankPos - 3;
        break;
      case 'down':
        newPos = blankPos + 3;
        break;
      case 'left':
        newPos = blankPos - 1;
        break;
      case 'right':
        newPos = blankPos + 1;
        break;
    }

    [newState[blankPos], newState[newPos]] = [newState[newPos], newState[blankPos]];
    return newState;
  };

  // DFS 搜索函数
  function search(state: PuzzleState, g: number, bound: number, path: PuzzleState[], visited: Set<string>): SearchResult {
    statesExplored++;

    // 检查是否应该终止搜索
    if (!shouldContinue) {
      return { result: 'timeout', path, statesExplored };
    }

    // 检查是否超时
    if (statesExplored % 10000 === 0 && (Date.now() - startTime) > timeout) {
      devWarn('Search timeout');
      shouldContinue = false;
      return { result: 'timeout', path, statesExplored };
    }

    const f = g + calculateManhattanDistance(state, goal);

    // 如果评估函数值超过bound，返回新的bound
    if (f > bound) {
      return { result: 'bound', newBound: f };
    }

    // 如果达到目标状态，返回路径
    if (stateToString(state) === stateToString(goal)) {
      return { result: 'found', path, statesExplored };
    }

    // 如果达到最大搜索深度
    if (g >= maxDepth) {
      return { result: 'depth_limit' };
    }

    // 记录当前状态的访问
    const stateStr = stateToString(state);
    visited.add(stateStr);

    let min = Infinity;

    // 尝试所有可能的移动
    const moves = getPossibleMoves(state);
    for (const move of moves) {
      const nextState = applyMove(state, move);
      const nextStateStr = stateToString(nextState);

      // 跳过已访问状态
      if (visited.has(nextStateStr)) continue;

      // 添加到路径
      path.push(nextState);

      // 递归搜索
      const result = search(nextState, g + 1, bound, path, new Set(visited));

      if (result.result === 'found' || result.result === 'timeout') {
        return result;
      }

      if (result.result === 'bound') {
        min = Math.min(min, result.newBound!);
      }

      // 从路径中移除
      path.pop();
    }

    return { result: 'bound', newBound: min };
  }

  // 主搜索循环
  while (true) {
    path = [];
    shouldContinue = true;
    const visited = new Set<string>();

    const result = search(initial, 0, bound, path, visited);

    devLog('result', result);
    if (result.result === 'found') {
      return {
        steps: [initial, ...path],
        totalCost: path.length,
        exploredNodes: result.statesExplored!
      };
    }

    if (result.result === 'timeout' || result.result === 'depth_limit') {
      devWarn(`Search ${result.result}`);
      return null;
    }

    if (result.newBound === Infinity) {
      return null; // 无解
    }

    bound = result.newBound!;
  }
} 