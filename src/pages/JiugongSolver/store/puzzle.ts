import { create } from 'zustand';
import type { PuzzleState, Solution } from '../types/puzzle';
import { aStar } from '../utils/solver';
import { getPuzzleStats } from '../utils/puzzle';

interface PuzzleStore {
  // 状态
  initial: PuzzleState;
  current: PuzzleState;
  goal: PuzzleState;
  solution: Solution | null;
  isSolving: boolean;
  stats: {
    inversionCount: number;
    isSolvable: boolean;
    estimatedSteps: number;
  };
  
  // 动作
  setInitial: (state: PuzzleState) => void;
  setCurrent: (state: PuzzleState) => void;
  setGoal: (state: PuzzleState) => void;
  solve: () => Promise<void>;
  reset: () => void;
}

const defaultState: PuzzleState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export const usePuzzleStore = create<PuzzleStore>((set, get) => ({
  initial: defaultState,
  current: defaultState,
  goal: defaultState,
  solution: null,
  isSolving: false,
  stats: {
    inversionCount: 0,
    isSolvable: true,
    estimatedSteps: 0
  },
  
  setInitial: (state) => {
    set({ initial: state, current: state });
    const stats = getPuzzleStats(state, get().goal);
    set({ stats });
  },
  
  setCurrent: (state) => {
    set({ current: state });
  },
  
  setGoal: (state) => {
    set({ goal: state });
    const stats = getPuzzleStats(get().current, state);
    set({ stats });
  },
  
  solve: async () => {
    const { current, goal } = get();
    set({ isSolving: true });
    
    try {
      const solution = await new Promise<Solution | null>((resolve) => {
        requestAnimationFrame(() => {
          const result = aStar(current, goal);
          console.log('A* result:', result);
          resolve(result);
        });
      });
      
      if (solution) {
        console.log('Solution found:', solution);
        // 如果初始状态有图片数据，为每个 step 添加正确排序的图片数据
        if (solution.steps[0].imageData) {
          const initialImageData = solution.steps[0].imageData;
          const initialTiles = [...initialImageData.tiles];
          
          // 为每个 step 添加正确排序的图片数据
          solution.steps = solution.steps.map(step => {
            // 提取数字部分
            const numbers = step.slice(0, 9) as number[];
            // 创建新的 tiles 数组
            const newTiles = numbers.map(num => {
              // 找到这个数字在初始状态中的位置
              const originalIndex = solution.steps[0].indexOf(num);
              // 使用初始位置对应的图片
              return initialTiles[originalIndex];
            });
            
            // 创建新的状态，包含数字和图片数据
            return {
              ...numbers,
              imageData: {
                ...initialImageData,
                tiles: newTiles
              }
            };
          });
        }
        
        set({ 
          solution,
          current: solution.steps[0],
          isSolving: false 
        });
      } else {
        console.warn('No solution found or search timeout');
        set({ 
          solution: null,
          isSolving: false 
        });
      }
    } catch (error) {
      console.error('Solving error:', error);
      set({ isSolving: false });
    }
  },
  
  reset: () => {
    set({
      current: get().initial,
      solution: null,
      isSolving: false
    });
  }
})); 