import { TYPES } from './actions';
import * as selectors from './selectors';

const initialState = {
  goalIndex: -1,
  goals: [],
  input: '',
  prompt: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TEST_INPUT_CHANGE: {
      const { input } = action.payload;

      if (input === selectors.currentGoal(state)) {
        return {
          ...state,
          input: '',
          goalIndex: state.goalIndex + 1,
        };
      } else {
        return { ...state, input };
      }
    }

    case TYPES.TEST_SET_GOALS: {
      const { goals } = action.payload;

      return {
        ...state,
        goals,
        goalIndex: 0,
      };
    }

    case TYPES.TEST_SET_PROMPT: {
      const { prompt } = action.payload;

      return { ...state, prompt };
    }

    default: return state;
  }
}
