import { ActionTypesEnum } from '../../enums';

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICycleState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: ICycleState, action: any) {
  switch(action.type) {
    case ActionTypesEnum.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };

    case ActionTypesEnum.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === state.activeCycleId) {
            return {...cycle, interruptedDate: new Date()};
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      }

    case ActionTypesEnum.MARK_CORRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === state.activeCycleId) {
            return {...cycle, finishedDate: new Date()};
          } else {
            return cycle;
          }
        }),
      }

    default:
      return state;
  }
}
