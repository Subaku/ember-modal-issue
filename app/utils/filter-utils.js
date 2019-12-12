

export function parseTimeTerm(term) {
  let parts = term.split(/\s+/, 1);

  // parseInt will extract out number from strings like '32something something'
  let parsedInt = parseInt(parts[0]);
  let intPart = Number.isInteger(parsedInt) ? parsedInt : null

  let theRest = term.replace(intPart, '');
  return [intPart, theRest]
}

export function joinTimeParts(int, timePart) {
  return `${int} ${timePart.trim()}`;
}
