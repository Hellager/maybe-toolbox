import { useState, useEffect, useRef } from 'react';
import type { PuzzleState } from '../types/puzzle';
import { isValidMove, moveNumber } from '../utils/puzzle';
import { cn } from '@/lib/utils';

interface PuzzleBoardProps {
  state: PuzzleState;
  onMove: (newState: PuzzleState) => void;
  disabled?: boolean;
  className?: string;
  customMode?: boolean;
  onCustomInput?: (row: number, col: number) => void;
  highlightCell?: number;
  imageData?: {
    src: string;
    tileSize: number;
    tiles: { x: number; y: number; width: number; height: number }[];
  };
}

const SIZE = 3;
const CELL_SIZE = 64; // px
const BORDER_WIDTH = 1;

export function PuzzleBoard({ state, onMove, disabled = false, className, customMode = false, onCustomInput, highlightCell, imageData }: PuzzleBoardProps) {
  const [activeCell, setActiveCell] = useState<{row: number, col: number} | null>(null);
  const [cellAnimations, setCellAnimations] = useState<Record<string, string>>({});
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>(Array(9).fill(null));

  // 生成所有格子的渲染信息（包括空白格）
  const cells = [] as { value: number|null, row: number, col: number }[];
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const index = i * SIZE + j;
      cells.push({ value: state[index], row: i, col: j });
    }
  }

  // 渲染图片到 canvas
  useEffect(() => {
    if (imageData) {
      const img = new Image();
      img.src = imageData.src;
      img.onload = () => {
        canvasRefs.current.forEach((canvas, index) => {
          if (canvas && imageData.tiles[index]) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              let tile;
              if (customMode) {
                // 自定义模式下，按原始顺序显示图片
                tile = imageData.tiles[index];
              } else {
                // 非自定义模式下，根据数字位置显示对应图片
                const currentValue = Array.isArray(state) ? state[index] : null;
                const originalIndex = currentValue !== null ? state.indexOf(currentValue) : index;
                tile = imageData.tiles[originalIndex];
              }
              ctx.clearRect(0, 0, CELL_SIZE, CELL_SIZE);
              ctx.drawImage(
                img,
                tile.x, tile.y, tile.width, tile.height,
                0, 0, CELL_SIZE, CELL_SIZE
              );
            }
          }
        });
      };
    }
  }, [imageData, state, customMode]);

  // const getAnimationClass = (prevRow: number, prevCol: number, newRow: number, newCol: number) => {
  //   if (newRow > prevRow) return 'animate__slideInDown animate__faster';
  //   if (newRow < prevRow) return 'animate__slideInUp animate__faster';
  //   if (newCol > prevCol) return 'animate__slideInLeft animate__faster';
  //   if (newCol < prevCol) return 'animate__slideInRight animate__faster';
  //   return '';
  // };

  const handleClick = (row: number, col: number) => {
    if (disabled) return;
    setActiveCell({ row, col });
    if (customMode && onCustomInput) {
      onCustomInput(row, col);
      return;
    }
    if (isValidMove(state, row, col)) {
      const newState = moveNumber(state, row, col);
      onMove(newState);
    }
  };

  // 清除动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setCellAnimations({});
    }, 1000);
    return () => clearTimeout(timer);
  }, [state]);

  // 清空 canvas
  const clearCanvas = () => {
    canvasRefs.current.forEach(canvas => {
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, CELL_SIZE, CELL_SIZE);
        }
      }
    });
  };

  // 监听 imageData 变化
  useEffect(() => {
    if (!imageData) {
      clearCanvas();
    }
  }, [imageData]);

  return (
    <div
      className={cn(
        "bg-background border border-border shadow-sm overflow-hidden relative",
        "inline-block",
        className
      )}
      style={{ width: SIZE * CELL_SIZE + 2 * BORDER_WIDTH, height: SIZE * CELL_SIZE + 2 * BORDER_WIDTH }}
    >
      {/* 分隔线 */}
      {[1,2].map(i => (
        <div key={"h"+i} style={{position:'absolute',left:0,right:0,top: i*CELL_SIZE-0.5, height:1, background:'var(--border)', zIndex:2}} />
      ))}
      {[1,2].map(j => (
        <div key={"v"+j} style={{position:'absolute',top:0,bottom:0,left: j*CELL_SIZE-0.5, width:1, background:'var(--border)', zIndex:2}} />
      ))}
      {/* Canvas 层 */}
      {cells.map((cell, index) => {
        // 只在非自定义模式下才绑定数字和图片
        const originalIndex = customMode ? index : (Array.isArray(state) ? state.indexOf(cell.value!) : index);
        return (
          <canvas
            key={`canvas-${cell.row}-${cell.col}`}
            ref={el => { canvasRefs.current[index] = el; }}
            width={CELL_SIZE}
            height={CELL_SIZE}
            style={{
              position: 'absolute',
              left: cell.col * CELL_SIZE,
              top: cell.row * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              zIndex: 1
            }}
            data-original-index={originalIndex}
          />
        );
      })}
      {/* 绝对定位的格子 */}
      {cells.map(cell => {
        const isActive = activeCell && activeCell.row === cell.row && activeCell.col === cell.col;
        if (cell.value === 0 || cell.value === null) {
          // 空白格
          return (
            <button
              key={`blank-${cell.row}-${cell.col}`}
              onClick={() => handleClick(cell.row, cell.col)}
              disabled={!customMode}
              className={cn(
                "flex items-center justify-center text-2xl font-bold select-none border border-border disabled:cursor-not-allowed rounded-none shadow-none",
                "w-full h-full",
                customMode ? "cursor-pointer hover:bg-accent" : "cursor-default",
                highlightCell === (cell.row * 3 + cell.col) ?  "bg-gray-50 border-blue-400 shadow-sm" : ""
              )}
              style={{
                position: 'absolute',
                left: cell.col * CELL_SIZE,
                top: cell.row * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                outline: 'none',
                userSelect: 'none',
                fontFamily: 'inherit',
                background: 'transparent',
                zIndex: 3
              }}
              onMouseLeave={() => setActiveCell(null)}
            />
          );
        }
        // 带数字格子
        return (
          <button
            key={`cell-${cell.row}-${cell.col}-${cell.value}`}
            onClick={() => handleClick(cell.row, cell.col)}
            disabled={disabled || (!customMode && cell.value === 0)}
            className={cn(
              "flex items-center justify-center text-2xl font-bold select-none text-foreground",
              "border border-border",
              !isActive && !disabled && !imageData && "hover:bg-accent hover:border-accent-foreground hover:shadow-sm cursor-pointer",
              !isActive && !disabled && imageData && "hover:border-accent-foreground hover:shadow-sm cursor-pointer",
              isActive && "border-primary bg-accent cursor-default",
              "disabled:cursor-not-allowed rounded-none shadow-none",
              cellAnimations[cell.value] && "animate__animated",
              cellAnimations[cell.value],
              highlightCell === (cell.row * 3 + cell.col) ? "bg-gray-50 border-blue-400 shadow-sm" : "",
              "bg-transparent"
            )}
            style={{
              position: 'absolute',
              left: cell.col * CELL_SIZE,
              top: cell.row * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              outline: 'none',
              userSelect: 'none',
              fontFamily: 'inherit',
              background: 'transparent',
              zIndex: 4
            }}
            onMouseLeave={() => setActiveCell(null)}
          >
            {cell.value}
          </button>
        );
      })}
    </div>
  );
}
 