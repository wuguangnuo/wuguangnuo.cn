function StringBuffer() {
  this.__strings__ = new Array();
}

StringBuffer.prototype.append = function (str) {
  this.__strings__.push(str);
  return this;
};

StringBuffer.prototype.toString = function () {
  return this.__strings__.join("");
};
