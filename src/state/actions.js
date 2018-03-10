import { addSlowWords } from './history/actions';
import { testSlowWords } from './test/selectors';

export { push } from 'react-router-redux';

export * from './history/actions';
export * from './test/actions';

export const addSlowWordsFromTest = () => (
  (dispatch, getState) => {
    const state = getState();
    dispatch(addSlowWords(testSlowWords(state.test)));
  }
);
