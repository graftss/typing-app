import { TYPES } from './actions';
import * as selectors from './selectors';

const initialState = {
  goals: [''],
  goalIndex: 0,
  prompts: [''],
  promptIndex: 0,
  input: '',
  running: false,
  complete: false,
  startTime: 0,
  lastActionTime: 0,
  endTime: 0,
};

const wordGoals = prompt => {
  const words = prompt.split(' ');
  return words.map((w, i) => i === words.length - 1 ? w : w + ' ');
};

const newPromptState = (prompts, promptIndex) => ({
  goals: wordGoals(prompts[promptIndex + 1]),
  goalIndex: 0,
  promptIndex: promptIndex + 1,
})

export default getTime => (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TEST_INPUT_CHANGE: {
      const { input } = action.payload;

      if (input === selectors.currentGoal(state)) {
        if (selectors.onLastGoal(state)) {
          if (selectors.onLastPrompt(state)) {
            return {
              ...state,
              complete: true,
              endTime: getTime(),
              goalIndex: state.goalIndex + 1,
              input: '',
            };
          } else {
            return {
              ...state,
              input: '',
              ...newPromptState(state.prompts, state.promptIndex),
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

      console.log('hi', newPromptState(prompts, -1));

      return {
        ...state,
        prompts,
        ...newPromptState(prompts, -1),
      };
    }

    case TYPES.TEST_START: {
      return { ...state, startTime: getTime(), running: true };
    }

    default: return state;
  }
}
