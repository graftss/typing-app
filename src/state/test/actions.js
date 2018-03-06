import { argCreator, getTime, keyMirror } from '../../utils';

export const TYPES = keyMirror([
  'TEST_END',
  'TEST_INPUT_CHANGE',
  'TEST_SET_GOALS',
  'TEST_SET_PROMPTS',
  'TEST_START',
]);

export const testInputChange = argCreator(TYPES.TEST_INPUT_CHANGE, ['input']);

export const testSetGoals = argCreator(TYPES.TEST_SET_GOALS, ['goals']);

export const testSetPrompts = argCreator(TYPES.TEST_SET_PROMPTS, ['prompts']);

export const testSetPassage = passage => dispatch => {
  const words = passage.split(' ');
  const goals = words.map((w, i) => i === words.length - 1 ? w : (w + ' '));

  dispatch(testSetPrompts([passage]));
  dispatch(testSetGoals(goals));
};

export const testStart = () => ({
  type: TYPES.TEST_START,
  time: getTime(),
});

export const testEnd = () => ({
  type: TYPES.TEST_END,
  time: getTime(),
});
