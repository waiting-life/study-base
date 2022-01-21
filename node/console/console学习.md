#### console.count()

```js
const x = "x";
const y = "y";
console.log(x, y);

const person = {
  name: "cpp",
  age: 22,
};
console.log(person);

console.log("我的%s已经%d岁", person.name, person.age);

const oranges = ["橙子", "橙子", "橙子"];
const apples = ["苹果"];
oranges.forEach((fruit) => {
  console.count(fruit);
});
apples.forEach((fruit) => {
  console.count(fruit);
});

// x y
// { name: 'cpp', age: 22 }
// 我的cpp已经22岁
// 橙子: 1
// 橙子: 2
// 橙子: 3
// 苹果: 1
```

#### 计算耗时

```js
const doSomething = () => console.log("测试");
const measureDoingSomething = () => {
  console.time("doSomething()");
  //做点事，并测量所需的时间。
  doSomething();
  console.timeEnd("doSomething()");
};
measureDoingSomething();

// doSomething(): 0.05ms
```

#### stdout 和 stderr

console.log 非常适合在控制台中打印消息。 这就是所谓的标准输出（或称为 stdout）。

console.error 会打印到 stderr 流。

#### 其他

有用库：
为输出着色：chalk
创建进度条：Process
ora
