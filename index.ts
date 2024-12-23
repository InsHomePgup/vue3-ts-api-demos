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
import Person from './person';
console.log(Person);
let Bob = new Person('Bob',20);
console.log(Bob);
// Bob.gender = 0;
Bob.setGender(0);
console.log(Bob);
console.log(Bob.gender)
const BobGender = Bob.getGender();
console.log(BobGender)

