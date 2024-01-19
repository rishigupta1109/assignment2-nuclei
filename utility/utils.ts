import readline from 'readline-sync';

export function readALine() {
  return readline.question('');
}

export const isAPositiveInteger = (value: any) => {
  return Number.isInteger(value) && value > 0;
};
export const isANonEmptyString = (value: any) => {
  return typeof value === 'string' && value.trim().length !== 0;
};
