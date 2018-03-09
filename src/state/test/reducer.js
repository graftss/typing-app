import { init, last, mergeAll } from 'ramda';

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

const getLines = (lineChars, words) => {
  const result = [];

  let line = [words[0]];
  let lineLength = words[0].length;

  for (const word of words.slice(1)) {
    const lengthWithWord = lineLength + 1 + word.length;

    if (lengthWithWord <= lineChars) {
      line.push(word);
      lineLength = lengthWithWord;
    } else {
      result.push(line);
      line = [word];
      lineLength = word.length;
    }
  }

  result.push(line);

  return result;
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
      } else if (state.running) {
        return { ...state, input };
      }

      return state;
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
      };
    }

    case TYPES.TEST_ADD_PROMPT: {
      const { prompt } = action.payload;

      const newGoals = wordGoals(prompt);
      // add a space to the last element of the old goals
      const oldGoals = init(state.goals).concat(last(state.goals) + ' ');
      const goals = oldGoals.concat(newGoals);

      return {
        ...state,
        prompt: state.prompt + ' ' + prompt,
        goals,
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
