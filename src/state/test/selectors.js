import {
  prop,
  reduce,
} from 'ramda';

import { roundToPlaces } from '../../utils';

export const testInput = prop('input');

export const goals = prop('goals');

export const goalIndex = prop('goalIndex');

export const prompts = prop('prompts');

export const promptIndex = prop('promptIndex');

export const currentGoal = state => goals(state)[goalIndex(state)];

export const onLastGoal = state => goalIndex(state) === goals(state).length - 1;

export const currentPrompt = state => prompts(state)[promptIndex(state)];

export const onLastPrompt = state => promptIndex(state) === prompts(state).length - 1;

export const testRunning = prop('running');

export const testComplete = prop('complete');

const testCharacters = state => (
  reduce((acc, prompt) => acc + prompt.length, 0, prompts(state))
);

const testDuration = state => state.endTime - state.startTime;

const round = roundToPlaces(2);

export const testResults = state => {
  const characters = testCharacters(state);
  const duration = testDuration(state);
  const seconds = round(duration / 1000);
  const wpm = round(characters / seconds * 12);

  return {
    characters,
    duration: seconds,
    wpm,
  };
};
