import { mergeAll } from 'ramda';

import { TYPES } from './actions';
import * as selectors from './selectors';
import { lastEqualIndex } from '../../utils';

const newGoalData = () => ({
  charTimestamps: [],
});

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
  currentGoalData: newGoalData(),
  goalData: [],
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
      const currentTime = getTime();

      if (input === currentGoal && state.running) {
        const duration = currentTime - state.lastGoalTime;
        const completedGoalData = {
          ...state.currentGoalData,
          charTimestamps: state.currentGoalData.charTimestamps.concat(duration),
          duration,
          goal: currentGoal,
        };

        const updates = [state, {
          charProgress: state.charProgress + currentGoal.length,
          currentGoalData: newGoalData(),
          goalData: [...state.goalData, completedGoalData],
          goalIndex: state.goalIndex + 1,
          input: '',
          lastGoalTime: currentTime,
        }];

        if (selectors.onLastGoal(state)) {
          updates.push({
            running: false,
            complete: true,
            endTime: currentTime,
            goalIndex: state.goalIndex + 1,
          });
        }

        return mergeAll(updates);
      } else {
        const matchIndex = lastEqualIndex(input, currentGoal);
        let charTimestamps = state.currentGoalData.charTimestamps;
        const lastMatchIndex = charTimestamps.length - 1;

        if (matchIndex === lastMatchIndex + 1) {
          const timestamp = currentTime - state.lastGoalTime;
          // if we added a correct letter, and we were correct before then
          charTimestamps = charTimestamps.concat(timestamp);
        } else if (matchIndex < lastMatchIndex) {
          // otherwise, cut off at the last correct letter
          charTimestamps = charTimestamps.slice(0, matchIndex + 1);
        }

        const currentGoalData = { charTimestamps };
        return { ...state, input, currentGoalData };
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
        goalData: [],
      };
    }

    case TYPES.TEST_START: {
      return {
        ...state,
        charProgress: 0,
        complete: false,
        currentGoalData: newGoalData(),
        lastGoalTime: getTime(),
        running: true,
        startTime: getTime(),
        waitingToStart: false,
      };
    }

    default: return state;
  }
}
