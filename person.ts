import * as _ from 'lodash-es';
type genderDto = 0|1

export default class Person {
    name: string;
    age: number;  // 普通属性
    gender?:genderDto;  // 只读属性
    constructor(name: string, age: number,gender?:genderDto) {  // 构造函数
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    clonePerson(person:Person){
        return new Person(person.name,person.age);
    }

    // private set gender(gender:genderDto){
    //     this.gender = gender;
    // }
    //
    // private get gender(){
    //     return this.gender;
    // }

    setGender(gender:genderDto){
        this.gender = gender;
    }

    getGender(){
        if(_.isNumber(this.gender)){
            return this.gender===0?'男':'女'
        }else{
            return null
        }
    }
}
