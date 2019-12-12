import { isNone } from '@ember/utils';

import { WHEN_SEEN_SEP } from "../constants";


function whenSeenTokenizer(value) {
  let token = {
    'Seen': 's',
    'Not Seen': 'ns',
    'days': 'd',
    'hours': 'h'
  }[value];

  return token || null;
}

function parseWhenSeenToken(token) {
  let value = {
    's': 'Seen',
    'ns': 'Not Seen',
    'd': 'days',
    'h': 'hours'
  }[token];

  return value || null;
}


export function parseWhenSeen(whenSeen) {
  if (isNone(whenSeen)) {
    return null;
  }

  let values = whenSeen.split(WHEN_SEEN_SEP).map((token, i) => {
    // The middle value is expected to be the number.
    if (i === 1) {
      return Number.isInteger(parseInt(token)) ? token : null;
    }
    return parseWhenSeenToken(token);
  });
  return values.length !== 3 || values.any(value => isNone(value)) ? null : values;
}

export function constructWhenSeen(visionValue, timeValue, timeType) {
  let tokens = [
    whenSeenTokenizer(visionValue),
    timeValue,
    whenSeenTokenizer(timeType)
  ];

  if (tokens.any(token => isNone(token)) || !Number.isInteger(parseInt(tokens[1]))) {
    return null
  }

  return tokens.join(WHEN_SEEN_SEP);
}
