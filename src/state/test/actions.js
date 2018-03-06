import { argCreator, keyMirror } from '../../utils';

export const TYPES = keyMirror([
  'TEST_INPUT_CHANGE',
]);

export const testInputChange = argCreator(TYPES.TEST_INPUT_CHANGE, ['input']);
