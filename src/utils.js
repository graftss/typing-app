import {
  assoc,
  curry,
  concat,
  map,
  merge,
  reduce,
  values,
  zipObj,
} from 'ramda';

export { sampleSize } from 'lodash';

export const getTime = () => new Date().getTime();

export const keyMirror = keys => zipObj(keys, keys);

export const argCreator = (type, props) => (...args) => ({
  type,
  payload: zipObj(props, args),
});

export const constantCreator = type => () => ({ type });

export const identityCreator = type => payload => ({ type, payload });

export const errorCreator = type => payload => ({ type, payload, error: true });

export const mapSelectorsToProps = selectorMap => (
  state => map(selector => selector(state), selectorMap)
);

export const mergeValues = obj => reduce(merge, {}, values(obj));

export const pickDefined = curry((props, obj) => reduce(
  (result, prop) => {
    if (!obj[prop]) {
      throw new Error(`pickDefined: prop "${prop}" not found`);
    } else {
      return assoc(prop, obj[prop], result);
    }
  },
  {},
  props,
));

export const roundToPlaces = places => {
  const shift = Math.pow(10, places);
  return r => Math.round(r * shift) / shift;
};

export const concatAll = reduce(concat, []);

export const getLines = (lineChars, words) => {
  const result = [];

  let line = [words[0]];
  let lineLength = words[0].length;

  for (const word of words.slice(1)) {
    const lengthWithWord = lineLength + 1 + word.length;

    if (lengthWithWord <= lineChars) {
      line.push(word);
      lineLength = lengthWithWord;
    } else {
      result.push(line);
      line = [word];
      lineLength = word.length;
    }
  }

  result.push(line);

  return result;
};

// Returns -1 if the first entries of `a` and `b` are unequal.
export const lastEqualIndex = (a, b) => {
  if (a.length > b.length) return lastEqualIndex(b, a);

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return i - 1;
  }

  return a.length - 1;
};
