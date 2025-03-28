// export const myName = 'foo'
// const obj:object={
//     foo:12
// }
//
// let num :number = 3;
//
// Object.keys(obj).forEach((key:string) => {
//     console.log(key)
// })
//
//
// interface PersonDto {
//     name: string
//     age: number
//     job?:string
//     salary?:number
//     readonly gender ?:0|1
// }
import Person from './person.ts'

console.log(Person)
const Bob = new Person('Bob', 20)
console.log(Bob)
// Bob.gender = 0;
Bob.setGender(0)
console.log(Bob)
const BobGender = Bob.getGender()
console.log(BobGender)

/**
 * 元组
 * 确定的数量和类型
 */

const tuple: [string, number, boolean?] = ['1', 1]

console.log(tuple)
if (tuple.length === 2) {

}

if (tuple.length === 3) {

}

const symbolA: symbol = Symbol('A')
const symbolB: symbol = Symbol('A')
console.log(symbolA, symbolB)
console.log(symbolA === symbolB)

function funA(numA: number, strA: string, booA: boolean): void {

}

function funB(numA: number): Promise<number> {
  return new Promise((resolve, reject) => {
    resolve(numA)
  })
}

interface sumFunc {
  (numA: number, strA: string, booA: boolean): void
}

const sum: sumFunc = () => {

}

// type sumFunction = (number,number)=>number;
// function sum : sumFunc(numA,numB){
//     return numA + numB;
// }

export default 'hello'
