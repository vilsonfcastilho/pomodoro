import { ActionTypesEnum } from '../../enums';
import { ICycle } from './reducer';

export function addNewCycleAction(newCycle: ICycle) {
  return {
    type: ActionTypesEnum.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interruptCycleAction() {
  return {
    type: ActionTypesEnum.INTERRUPT_CYCLE,
  };
}

export function markCycleAsFinishedAction() {
  return {
    type: ActionTypesEnum.MARK_CORRENT_CYCLE_AS_FINISHED,
  };
}
