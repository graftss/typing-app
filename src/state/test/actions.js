

import prompts from './prompts';
import { argCreator, getTime, keyMirror } from '../../utils';

export const TYPES = keyMirror([
  'TEST_END',
  'TEST_INPUT_CHANGE',
  'TEST_SET_GOALS',
  'TEST_SET_PROMPT',
  'TEST_START',
]);

export const testInputChange = argCreator(TYPES.TEST_INPUT_CHANGE, ['input']);

export const testSetGoals = argCreator(TYPES.TEST_SET_GOALS, ['goals']);

export const testSetPrompt = argCreator(TYPES.TEST_SET_PROMPT, ['prompt']);

export const testStart = () => ({
  type: TYPES.TEST_START,
  time: getTime(),
});

export const testEnd = () => ({
  type: TYPES.TEST_END,
  time: getTime(),
});

export const testNewPrompt = () => (
  dispatch => {

  }
);
