import dict from './dict';
import { addSlowWords } from './history/actions';
import { testSetPrompt } from './test/actions';
import { testSlowWords } from './test/selectors';
import { sampleSize } from '../utils';

export { push } from 'react-router-redux';
export * from './history/actions';
export * from './test/actions';
export * from './testConfig/actions';

export const addSlowWordsFromTest = () => (
  (dispatch, getState) => {
    const state = getState();
    dispatch(addSlowWords(testSlowWords(state.test)));
  }
);

export const newPrompt = () => (
  (dispatch, getState) => {
    const state = getState();
    const { filter, wordCount } = state.testConfig;

    const wordBank = filter ? dict.filter(w => filter.test(w)) : dict;
    const words = sampleSize(wordBank, wordCount);
    const prompt = words.join(' ');

    dispatch(testSetPrompt(prompt));
  }
);
