import { TYPES } from './actions';

const initialState = {
  input: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TEST_INPUT_CHANGE: {
      const { input } = action.payload;

      return { ...state, input };
    }

    default: return state;
  }
}
