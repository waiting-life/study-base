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

const doSomething = () => console.log("测试");
const measureDoingSomething = () => {
  console.time("doSomething()");
  //做点事，并测量所需的时间。
  doSomething();
  console.timeEnd("doSomething()");
};
measureDoingSomething();
