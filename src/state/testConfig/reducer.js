import { TYPES } from './actions';

const initialState = {
  wordCount: 50,
  filter: undefined,
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case TYPES.TEST_CONFIG_SET: {
      const { config } = payload;

      return { ...state, ...config }
    }

    default: return state;
  }
}
