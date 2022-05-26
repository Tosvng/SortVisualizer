export default class Number {
  constructor(value, scale) {
    this.scale = 100 / scale;
    this.value = value * scale;
  }

  getValue() {
    return this.value;
  }
  getScale() {
    return this.scale;
  }
  toString() {
    return this.value;
  }
}
