import { curry, prop } from 'ramda';
import { createSelector } from 'reselect';

import { roundToPlaces } from '../../utils';

export const testInput = prop('input');

export const goals = prop('goals');

export const goalIndex = prop('goalIndex');

export const completedGoals = createSelector(
  goals,
  goalIndex,
  (words, idx) => words.slice(0, idx),
);

const extractWordFromGoal = goal => goal.match(/(\w+)/)[0];

export const completedWords = createSelector(
  completedGoals,
  goals => goals.map(extractWordFromGoal),
);

export const currentGoal = state => goals(state)[goalIndex(state)] || '';

export const onLastGoal = state => goalIndex(state) === goals(state).length - 1;

export const testPrompt = prop('prompt');

export const testRunning = prop('running');

export const testComplete = prop('complete');

export const testWaitingToStart = prop('waitingToStart');

export const charProgress = prop('charProgress');

export const goalData = prop('goalData');

export const testRuntime = state => state.lastGoalTime - state.startTime;

const round = roundToPlaces(2);

export const testRuntimeSeconds = state => round(testRuntime(state) / 1000);

const wpm = (chars, ms) => chars / ms * 12000;

export const testWpm = createSelector(charProgress, testRuntime, wpm);

export const goalWpm = curry((state, goalIndex) => {
  const goalChars = goals(state)[goalIndex].length;
  const data = goalData(state)[goalIndex].duration;

  return wpm(goalChars, data);
});

export const testSlowWords = state => {
  const words = completedWords(state);
  const avgWpm = testWpm(state);

  return words.filter((_, index) => goalWpm(state, index) < .7 * avgWpm)
};

export const testResults = createSelector(
  charProgress,
  testRuntimeSeconds,
  testWpm,
  (characters, duration, wpm) => ({
    characters,
    duration: round(duration),
    wpm: round(wpm),
  }),
);
