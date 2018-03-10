import { TYPES } from './actions';

const initialState = {
  slowWords: [],
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case TYPES.HISTORY_ADD_SLOW_WORDS: {
      const { words } = payload;

      return { ...state, slowWords: state.slowWords.concat(words) };
    }

    default: return state;
  }
};
