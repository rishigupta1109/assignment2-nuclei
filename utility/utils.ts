import readline from 'readline-sync'

export function add(a: number, b: number): number {
  return a + b;
}

export function readALine(){
  return readline.question("");
}