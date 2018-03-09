import {
  prop,
  reduce,
} from 'ramda';

import { roundToPlaces } from '../../utils';

export const testInput = prop('input');

export const goals = prop('goals');

export const goalIndex = prop('goalIndex');

export const testPrompt = prop('prompt');

export const currentGoal = state => goals(state)[goalIndex(state)];

export const onLastGoal = state => goalIndex(state) === goals(state).length - 1;

export const testRunning = prop('running');

export const testComplete = prop('complete');

export const testWaitingToStart = prop('waitingToStart');

export const charProgress = prop('charProgress');

export const testRuntime = state => state.lastGoalTime - state.startTime;

const round = roundToPlaces(2);

export const testResults = state => {
  const characters = charProgress(state);
  const duration = testRuntime(state);
  const seconds = round(duration / 1000);
  const wpm = round(characters / seconds * 12);

  return {
    characters,
    duration: seconds,
    wpm,
  };
};
