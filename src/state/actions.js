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

const parseFilterObj = filterObj => {
  if (typeof filterObj === 'string') {
    return word => word.includes(filterObj);
  } else if (filterObj instanceof RegExp) {
    return word => filterObj.test(word);
  } else {
    return () => true;
  }
};

export const newPrompt = () => (
  (dispatch, getState) => {
    const state = getState();
    const { filter, wordCount } = state.testConfig;

    const wordBank = dict.filter(parseFilterObj(filter));
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
        const filterString = args[1];
        let filterObj;

        if (filterString.startsWith('/') && filterString.endsWith('/')) {
          filterObj = new RegExp(filterObj);
        } else {
          filterObj = filterString;
        }

        dispatch(testConfigSet({ filter: filterObj }));
      }
    }

    dispatch(testInputChange(''));
  }
);
