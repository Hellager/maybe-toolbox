import { useTranslation } from 'react-i18next'
import { useHeader } from "@/contexts/HeaderContext"
import { useEffect, useState, useRef } from 'react'
import { PuzzleBoard } from './components/PuzzleBoard'
import { usePuzzleStore } from './store/puzzle'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import type { PuzzleState } from './types/puzzle'

const emptyBoard = () => Array(9).fill(null);
const defaultBoard = () => [1, 2, 3, 4, 5, 6, 7, 8, 0] as PuzzleState;

export function JiugongSolver() {
  const { t } = useTranslation()
  const { setHeader } = useHeader()
  const {
    initial,
    solution,
    isSolving,
    stats,
    setInitial,
    setCurrent,
    setGoal,
    solve,
    reset
  } = usePuzzleStore()
  
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 自定义相关状态
  const [customizing, setCustomizing] = useState<'none'|'initial'|'goal'>('none');
  const [customBoard, setCustomBoard] = useState<(number|null)[]>(emptyBoard());
  const [customStep, setCustomStep] = useState(1); // 1-9
  const [awaitBlank, setAwaitBlank] = useState(false);

  useEffect(() => {
    setHeader(
      t('jiugongge.title'),
      t('jiugongge.description')
    )
  }, [t, setHeader])

  // 处理重置
  const handleReset = () => {
    const newInitial = defaultBoard();
    const newGoal = defaultBoard();
    setInitial(newInitial);
    setGoal(newGoal);
    setCustomizing('none');
    setCustomBoard(emptyBoard());
    setCustomStep(1);
    setAwaitBlank(false);
    // 清空文件输入框的值
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    reset();
  };

  // 初始化时，初始和目标状态都为1-8+空格
  useEffect(() => {
    setInitial(defaultBoard());
    setGoal(defaultBoard());
  }, []);

  useEffect(() => {
    if (solution === null && !stats.isSolvable) {
      toast.error("无法求解", {
        description: "当前状态无法到达目标状态"
      })
    }
  }, [solution, stats.isSolvable])

  // 当solution改变时，重置当前步骤
  useEffect(() => {
    if (solution) {
      setCurrentStep(0);
    }
  }, [solution]);

  // 处理步骤导航
  const handleStepChange = (step: number) => {
    if (solution && step >= 0 && step < solution.steps.length) {
      setCurrentStep(step);
      setCurrent(solution.steps[step]);
    }
  };

  // 自定义输入点击
  const handleCustomInput = (row: number, col: number) => {
    if (awaitBlank) {
      // 指定空白格
      const filled = [...customBoard];
      // 找到被指定为0的格子，记录其位置
      const blankIndex = row * 3 + col;
      // 记录所有数字，保留顺序
      let nums: number[] = [];
      for (let i = 0; i < 9; i++) {
        if (i !== blankIndex) {
          if (filled[i] !== null) nums.push(filled[i]!);
        }
      }
      // 该格设为0，其余格按原顺序填入nums
      let idx = 0;
      for (let i = 0; i < 9; i++) {
        if (i === blankIndex) {
          filled[i] = 0;
        } else {
          filled[i] = nums[idx++];
        }
      }
      // 保留原有的 imageData
      const newState = filled as PuzzleState;
      newState.imageData = initial.imageData;
      setInitial(newState);
      // 自动生成目标状态：找出被0取代的数字，排序后替换回0
      // 找出被0取代的数字（1-9中缺失的数字）
      const missingNum = Array.from({length: 9}, (_, i) => i + 1).find(num => !nums.includes(num))!;
      // 将0替换为缺失的数字
      let sorted = [...filled];
      sorted[sorted.indexOf(0)] = missingNum;
      // 排序
      sorted.sort((a, b) => (a ?? 0) - (b ?? 0));
      // 将缺失的数字替换回0
      sorted[sorted.indexOf(missingNum)] = 0;
      // 直接使用排序后的数组作为目标状态
      setGoal(sorted as PuzzleState);
      setCustomizing('none');
      setAwaitBlank(false);
      setCustomStep(1);
      setCustomBoard(emptyBoard());
      toast.success("自定义完成", {
        description: "已设置自定义状态，目标状态已自动生成"
      });
      return;
    }
    // 依次填入1-9
    const index = row * 3 + col;
    if (customBoard[index] !== null) return;
    const next = [...customBoard];
    next[index] = customStep;
    setCustomBoard(next);
    if (customStep === 9) {
      setAwaitBlank(true);
      toast.info("请指定空白格", {
        description: "点击一个格子作为空白格（0）"
      });
    } else {
      setCustomStep(customStep + 1);
    }
  };

  // 处理自定义图片
  const handleCustomImage = () => {
    // 先清空文件输入框的值
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fileInputRef.current?.click();
  };

  const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const tileSize = Math.floor(Math.min(img.width, img.height) / 3);
      const tiles = [];
      
      // 计算每个切片的坐标和尺寸
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          tiles.push({
            x: x * tileSize,
            y: y * tileSize,
            width: tileSize,
            height: tileSize
          });
        }
      }

      setCustomizing('initial');
      setCustomBoard(Array(9).fill(null));
      setCustomStep(1);
      setAwaitBlank(false);
      // 清空解题步骤
      setCurrentStep(0);
      setCurrent(initial);
      reset();

      // 将图片数据传递给 PuzzleBoard
      const imageData = {
        src: img.src,
        tileSize,
        tiles
      };

      // 更新初始状态的图片数据
      const newState = [...defaultBoard()] as PuzzleState;
      newState.imageData = imageData;
      setInitial(newState);

      toast.info("请指定数字顺序", {
        description: "点击格子指定数字 1-9 的顺序"
      });
    };
  };

  // 处理自定义状态
  const handleCustomState = () => {
    setCustomizing('initial');
    setCustomBoard(Array(9).fill(null));
    setCustomStep(1);
    setAwaitBlank(false);
    // 清空解题步骤
    setCurrentStep(0);
    setCurrent(initial);
    reset();
    toast.info("请指定数字顺序", {
      description: "点击格子指定数字 1-9 的顺序"
    });
  };

  // 渲染棋盘内容
  const renderBoard = (type: 'initial'|'goal', state: PuzzleState, setState: (s: PuzzleState) => void) => (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{type === 'initial' ? t('jiugongge.initial_state') : t('jiugongge.goal_state')}</h3>
      </div>
      <PuzzleBoard
        state={customizing === type ? (customBoard as PuzzleState) : state}
        onMove={(newState) => {
          // 保留图片数据
          if (type === 'initial' && state.imageData) {
            newState.imageData = state.imageData;
          }
          setState(newState);
        }}
        className="mx-auto"
        customMode={customizing === type}
        onCustomInput={customizing === type ? handleCustomInput : undefined}
        disabled={isSolving}
        imageData={type === 'initial' ? state.imageData : undefined}
      />
    </div>
  );

  return (
    <div className="flex-1 flex items-center justify-center py-16">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-card rounded-lg shadow-lg p-8">
          {/* <h1 className="text-3xl font-bold mb-6 text-foreground">{t('jiugongge.title')}</h1> */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-8">
              {/* 左侧：初始状态 */}
              <div className="flex flex-col items-center">
                {renderBoard('initial', initial, setInitial)}
              </div>

              {/* 中间：控制按钮和状态信息 */}
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={solve}
                    disabled={isSolving || !stats.isSolvable}
                    className="w-full"
                  >
                    {isSolving ? t('jiugongge.solving') : t('jiugongge.start_solve')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCustomState}
                    disabled={isSolving}
                    className="w-full"
                  >
                    {t('jiugongge.custom_state')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCustomImage}
                    disabled={isSolving}
                    className="w-full"
                  >
                    {t('jiugongge.custom_image')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={isSolving}
                    className="w-full"
                  >
                    {t('jiugongge.reset')}
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={onImageSelected}
                  />
                </div>

                {isSolving && (
                  <div className="w-full">
                    <Progress value={undefined} className="h-2" />
                  </div>
                )}

                {/* 状态信息或解题步骤控制 */}
                <div className="text-sm text-gray-600 space-y-2 min-h-[120px] flex flex-col justify-center">
                  {solution ? (
                    <>
                      <div className="text-center">
                        <p>{t('jiugongge.total_steps')}: {solution.totalCost}</p>
                        <p>{t('jiugongge.explored_nodes')}: {solution.exploredNodes}</p>
                      </div>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStepChange(currentStep - 1)}
                          disabled={currentStep === 0}
                        >
                          {t('jiugongge.prev_step')}
                        </Button>
                        <span className="text-sm">
                          {currentStep + 1} / {solution.steps.length}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStepChange(currentStep + 1)}
                          disabled={currentStep === solution.steps.length - 1}
                        >
                          {t('jiugongge.next_step')}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{t('jiugongge.inversion_count')}: {stats.inversionCount}</p>
                      <p>{t('jiugongge.solvability')}: {stats.isSolvable ? t('jiugongge.solvable') : t('jiugongge.unsolvable')}</p>
                      <p>{t('jiugongge.estimated_steps')}: {stats.estimatedSteps}</p>
                    </>
                  )}
                </div>
              </div>

              {/* 右侧：解题步骤 */}
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">{t('jiugongge.solution_steps')}</h3>
                {solution ? (
                  <div className="w-full">
                    <div className="flex flex-col items-center">
                      {currentStep < solution.steps.length - 1 && (() => {
                        const currentState = solution.steps[currentStep];
                        const nextState = solution.steps[currentStep + 1];
                        // 提取数字数组部分
                        const currentNumbers = Object.values(currentState).slice(0, 9) as number[];
                        const nextNumbers = Object.values(nextState).slice(0, 9) as number[];
                        const blankIndex = currentNumbers.indexOf(0);
                        const highlightIndex = nextNumbers.indexOf(currentNumbers[blankIndex]);
                        return (
                          <PuzzleBoard
                            state={currentNumbers}
                            disabled={true}
                            className="mx-auto"
                            onMove={() => {}}
                            highlightCell={highlightIndex}
                            imageData={currentState.imageData}
                          />
                        );
                      })()}
                      {currentStep === solution.steps.length - 1 && (() => {
                        const lastState = solution.steps[currentStep];
                        const lastNumbers = Object.values(lastState).slice(0, 9) as number[];
                        return (
                          <PuzzleBoard
                            state={lastNumbers}
                            disabled={true}
                            className="mx-auto"
                            onMove={() => {}}
                            imageData={lastState.imageData}
                          />
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">{t('jiugongge.no_solution')}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
