// @ts-ignore
// 将a的类型设置为number，之后a只能为number
let a: number = 2;
a = 1;
// a = "ni"
let c = false
c = true
// 字面量，类似于常量
let aa: 10

// 使得字面量可以为两值中的一个，联合类型
let b: "male" | "female"


export function sum(a: number, b: number) {
    return a + b;
}

console.log(sum(12, 12));