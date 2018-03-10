import { mergeAll } from 'ramda';

import { TYPES } from './actions';
import * as selectors from './selectors';

const initialState = {
  goals: [''],
  goalIndex: 0,
  prompt: '',
  input: '',
  running: false,
  waitingToStart: false,
  complete: false,
  startTime: 0,
  lastGoalTime: 0,
  endTime: 0,
  charProgress: 0,
  goalDurations: [],
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

      if (input === currentGoal && state.running) {
        const lastGoalTime = getTime();
        const goalDuration = {
          goal: currentGoal,
          duration: lastGoalTime - state.lastGoalTime,
        };

        const updates = [state, {
          input: '',
          goalIndex: state.goalIndex + 1,
          lastGoalTime,
          charProgress: state.charProgress + currentGoal.length,
          goalDurations: [...state.goalDurations, goalDuration],
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

    case TYPES.TEST_SET_PROMPT: {
      const { prompt } = action.payload;
      const goals = wordGoals(prompt);

      return {
        ...state,
        prompt,
        goals,
        goalIndex: 0,
        waitingToStart: true,
        input: '',
        goalDurations: [],

      };
    }

    case TYPES.TEST_START: {
      return {
        ...state,
        startTime: getTime(),
        lastGoalTime: getTime(),
        waitingToStart: false,
        running: true,
        charProgress: 0,
      };
    }

    default: return state;
  }
}
