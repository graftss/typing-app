import dict from './dict';
import {
  argCreator,
  constantCreator,
  getTime,
  keyMirror,
  sampleSize,
} from '../../utils';

export const TYPES = keyMirror([
  'TEST_ADD_PROMPT',
  'TEST_INPUT_CHANGE',
  'TEST_SET_GOALS',
  'TEST_SET_PROMPT',
  'TEST_START',
]);

export const testInputChange = argCreator(TYPES.TEST_INPUT_CHANGE, ['input']);

export const testSetPrompt = argCreator(TYPES.TEST_SET_PROMPT, ['prompt']);

export const testStart = constantCreator(TYPES.TEST_START);

export const testNewPrompt = ({ wordCount }) => (
  dispatch => {
    const words = sampleSize(dict, wordCount);
    const prompt = words.join(' ');
    dispatch(testSetPrompt(prompt));
  }
);

export const testAddPrompt = argCreator(TYPES.TEST_ADD_PROMPT, ['prompt']);
