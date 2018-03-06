import { prop } from 'ramda';

export const testInput = prop('input');

export const goals = prop('goals');

export const goalIndex = prop('goalIndex');

export const prompt = prop('prompt');

export const currentGoal = state => goals(state)[goalIndex(state)];
