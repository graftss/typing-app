import { mergeAll } from 'ramda';

import { TYPES } from './actions';
import * as selectors from './selectors';

const initialState = {
  goals: [''],
  goalIndex: 0,
  prompt: '',
  input: '',
  running: false,
  complete: false,
  startTime: 0,
  lastGoalTime: 0,
  endTime: 0,
  charProgress: 0,
};

const wordGoals = prompt => {
  const words = prompt.split(' ');
  return words.map((w, i) => i === words.length - 1 ? w : w + ' ');
};

export default getTime => (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TEST_INPUT_CHANGE: {
      const { input } = action.payload;
      const currentGoal = selectors.currentGoal(state);

      if (input === currentGoal) {
        const lastGoalTime = getTime();

        const updates = [state, {
          input: '',
          goalIndex: state.goalIndex + 1,
          lastGoalTime,
          charProgress: state.charProgress + currentGoal.length,
        }];

        if (selectors.onLastGoal(state)) {
          updates.push({
            running: false,
            complete: true,
            endTime: lastGoalTime,
          });
        }

        return mergeAll(updates);
      } else {
        return { ...state, input };
      }
    }

    case TYPES.TEST_SET_GOALS: {
      const { goals } = action.payload;

      return { ...state, goals, goalIndex: 0 };
    }

    case TYPES.TEST_SET_PROMPT: {
      const { prompt } = action.payload;
      const goals = wordGoals(prompt);

      return { ...state, prompt, goals, goalIndex: 0 };
    }

    case TYPES.TEST_START: {
      return {
        ...state,
        startTime: getTime(),
        lastGoalTime: getTime(),
        running: true,
        charactersTyped: 0,
      };
    }

    default: return state;
  }
}
