import { prop } from 'ramda';

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
