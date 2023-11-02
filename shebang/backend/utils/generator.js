const items = require('../db.json');

const buildRandomString = length => {
  let randomStr = "Lorem Ipsum";
  let values = [];
  while (length > 0) {
    randomStr += " ";
    const randN = Math.floor(
      Math.random() * Object.keys(items.list).length + 1
    );
    values.push(randN);
    randomStr += items.list[randN];
    length--;
  }
  return randomStr;
};

module.exports = buildRandomString;
