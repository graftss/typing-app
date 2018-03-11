import {
  argCreator,
  constantCreator,
  keyMirror,
} from '../../utils';

export const TYPES = keyMirror([
  'TEST_INPUT_CHANGE',
  'TEST_SET_GOALS',
  'TEST_SET_PROMPT',
  'TEST_START',
]);

export const testInputChange = argCreator(TYPES.TEST_INPUT_CHANGE, ['input']);

export const testSetPrompt = argCreator(TYPES.TEST_SET_PROMPT, ['prompt']);

export const testStart = constantCreator(TYPES.TEST_START);

export const testAddPrompt = argCreator(TYPES.TEST_ADD_PROMPT, ['prompt']);
