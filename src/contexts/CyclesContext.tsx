import {
  createContext,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react';
import { differenceInSeconds} from 'date-fns';

import { cyclesReducer, ICycle } from '../reducers/cycles/reducer';
import {
  addNewCycleAction,
  interruptCycleAction,
  markCycleAsFinishedAction,
} from '../reducers/cycles/actions';

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContext {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  createNewCycle: (data: ICreateCycleData) => void;
  interruptCycle: () => void;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

interface ICyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContext);

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderProps) {
  const [ cyclesState, dispatch ] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, (initialState) => {
    const storageStateAsJSON = localStorage.getItem(
      '@pomodoto:cycles-state-1.0.0',
    );

    if (storageStateAsJSON) {
      return JSON.parse(storageStateAsJSON);
    }

    return initialState;
  });
  
  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@pomodoto:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

  function createNewCycle(data: ICreateCycleData) {
    const id = String(new Date().getTime());
    
    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch(interruptCycleAction());
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        interruptCycle,
        markCurrentCycleAsFinished,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
