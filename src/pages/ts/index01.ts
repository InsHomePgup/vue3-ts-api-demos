export interface sumFun {
  (str: string): string
}
export const sum: sumFun = (str: string) => {
  return str
}
export const sum1: (str: string) => string = (str) => {
  return str
}
