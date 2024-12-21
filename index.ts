export const myName = 'foo'
const obj:object={
    foo:12
}

Object.keys(obj).forEach((key:string) => {
    console.log(key)
})
