import { argCreator, keyMirror } from '../../utils';

export const TYPES = keyMirror([
  'HISTORY_ADD_SLOW_WORDS',
]);

export const addSlowWords = argCreator(TYPES.HISTORY_ADD_SLOW_WORDS, ['words']);
