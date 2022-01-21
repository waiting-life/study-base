#### 使用 exports 从 node.js 文件中公开功能

默认情况下，文件中定义的任何其他对象或变量都是私有的，不会公开给外界。
当将对象或函数赋值为新的 exports 属性时，这就是要被公开的内容，因此，可以将其导入应用程序的其他部分或其他应用程序中。

**可以通过两种方式进行操作**

1. 第一种方式是将对象赋值给`module.exports`(这是，模块系统提供的对象)，这会使文件只导出该对象

```js
// car.js
const car = {
  brand: "Ford",
  model: "Fiesta",
};

module.exports = car;

// index.js
const car = require("./car");
console.log(car);

// { brand: 'Ford', model: 'Fiesta' }
```

2. 第二种方式是将要导出的对象添加为 exports 的属性。这种方式可以导出多个对象、函数或数据：

```js
// person.js
const person = {
  name: "cpp",
  age: 22,
};

exports.person = person;

// 或者直接
// exports.person = { name: "cpp", age: 22 };

// index.js
const items = require("./person");
console.log(items); // { person: { name: 'cpp', age: 22 } }
console.log(items.person); // { name: 'cpp', age: 22 }
// 或者
const person = require("./person").person;
console.log(person); // { name: 'cpp', age: 22 }
```

module.exports 和 export 之间有什么区别？

前者公开了它指向的对象。 后者公开了它指向的对象的属性。
