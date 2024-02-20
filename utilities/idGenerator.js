module.exports = function idGenerator(length) {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let id = "";
  for (i = 1; i <= length; i++) {
    id += alpha[Math.round(Math.random() * 35)];
  }
  return id;
};
