import { argCreator, keyMirror } from '../../utils';

export const TYPES = keyMirror([
  'TEST_CONFIG_SET',
]);

export const testConfigSet = argCreator(TYPES.TEST_CONFIG_SET, ['config']);
