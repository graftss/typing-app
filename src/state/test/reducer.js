import { TYPES } from './actions';
import * as selectors from './selectors';

const initialState = {
  goals: [''],
  goalIndex: 0,
  prompts: [''],
  promptIndex: 0,
  input: '',
  running: false,
  complete: true,
  startTime: 0,
  endTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TEST_INPUT_CHANGE: {
      const { input } = action.payload;

      if (input === selectors.currentGoal(state)) {
        if (selectors.onLastGoal(state)) {
          if (selectors.onLastPrompt(state)) {
            return initialState;
          } else {
            return {
              ...state,
              input: '',
              goalIndex: 0,
              promptIndex: state.promptIndex + 1
            };
          }
        } else {
          return {
            ...state,
            input: '',
            goalIndex: state.goalIndex + 1,
          };
        }
      } else {
        return { ...state, input };
      }
    }

    case TYPES.TEST_SET_GOALS: {
      const { goals } = action.payload;

      return { ...state, goals, goalIndex: 0 };
    }

    case TYPES.TEST_SET_PROMPTS: {
      const { prompts } = action.payload;

      return { ...state, prompts, promptIndex: 0 };
    }

    case TYPES.TEST_START: {
      const { time } = action.payload;

      return { ...state, startTime: time, running: true };
    }

    case TYPES.TEST_END: {
      const { time } = action.payload;

      return { ...state, endTime: time, running: false, complete: true };
    }

    default: return state;
  }
}
