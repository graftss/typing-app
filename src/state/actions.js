import dict from './dict';
import { addSlowWords } from './history/actions';
import { testInputChange, testSetPrompt } from './test/actions';
import { testConfigSet } from './testConfig/actions';
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

const regexpFromFilter = filter => new RegExp(filter.slice(1, filter.length - 1));

const parseFilter = filter => {
  if (filter.startsWith('/') && filter.endsWith('/')) {
    const regexp = regexpFromFilter(filter);
    return word => regexp.test(word);
  } else if (typeof filter === 'string') {
    return word => word.includes(filter);
  } else {
    return () => true;
  }
};

const filterDict = (filter, dict) => dict.filter(parseFilter(filter));

export const newPrompt = () => (
  (dispatch, getState) => {
    const state = getState();
    const { filter, wordCount } = state.testConfig;

    const wordBank = filterDict(filter, dict);
    const words = sampleSize(wordBank, wordCount);
    const prompt = words.join(' ');

    dispatch(testSetPrompt(prompt));
  }
);

const getArgs = command => command.trim().split(/\s+/);

export const runCommand = command => (
  (dispatch, getState) => {
    const args = getArgs(command);

    switch (args[0]) {
      case '':
      case 'start': {
        return dispatch(newPrompt());
      }

      case 'words': {
        const wordCount = Math.min(80, parseInt(args[1]));

        if (wordCount > 0) {
          dispatch(testConfigSet({ wordCount }));
        }
      }

      case 'filter': {
        const filter = args[1];
        const wordBank = filterDict(filter, dict);

        if (wordBank.length === 0) {
          console.log('cause guess why');
        } else {
          dispatch(testConfigSet({ filter }));
        }
      }
    }

    dispatch(testInputChange(''));
  }
);
