import { argCreator, keyMirror } from '../../utils';

export const TYPES = keyMirror([
  'TEST_INPUT_CHANGE',
  'TEST_SET_GOALS',
  'TEST_SET_PROMPT',
]);

export const testInputChange = argCreator(TYPES.TEST_INPUT_CHANGE, ['input']);

export const testSetGoals = argCreator(TYPES.TEST_SET_GOALS, ['goals']);

export const testSetPrompt = argCreator(TYPES.TEST_SET_PROMPT, ['prompt']);

export const testSetPassage = passage => dispatch => {
  const words = passage.split(' ');
  const goals = words.map((w, i) => i === words.length - 1 ? w : (w + ' '));

  dispatch(testSetPrompt(passage));
  dispatch(testSetGoals(goals));
};
