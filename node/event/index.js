const EventEmitter = require("events");
const door = new EventEmitter();

door.addListener("open", () => {
  console.log(2222);
});
