/**
 * In very simple terms, the Liskov Substitution principle states that if a
 * function is able to accept a base class, it should be able to accept a derived
 * class as well.
 */

// Let's start with the classic example of shapes. We begin by creating a
// Rectangle class to represent a rectangle.

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  toString() {
    return `${this.width}x${this.height}`;
  }
}

// and for the sake of it, let's run the code
let rc = new Rectangle(10, 20);
console.log(rc.toString());

// As usual, we have new requirements after some time, and now we're
// interested in a Square object.

class Square extends Rectangle{
  constructor(size) {
    super(size, size);
  }
}

// and here's the code that plays with this square
const sq = new Square(5);
console.log(sq.toString())

// So far so good, but now we get into the murky waters.
// For instance, there's nothing preventing us from modifying the square
// in a stupid way
sq.width = 10;
console.log(sq.toString()) // 10x5

// What to do here? One idea might be to access properties through getters and
// setters, and use the setters to "fix" both the square's sides whenever any is
// updated.

// To make the readability flow of this file natural, I'm going to add these getters
// and setters dynamically.

Rectangle.prototype.width = function () {
  return this.width;
}

Rectangle.prototype.height = function () {
  return this.height;
}

Rectangle.prototype.setWidth = function(value) {
  this.width = value;
}

Rectangle.prototype.setHeight = function(value) {
  this.height = value;
}

// We need special setters for the square, as we need to ensure that its
// width and height are always equal.

Square.prototype.setWidth = Square.prototype.setHeight = function (value) {
  this.width = this.height = value;
}

// let's check that this is working
let sq2 = new Square();
sq2.setWidth(10);
console.log(sq2.area); // 100

// It's natural to have written out this clever code and feel a sense of
// pride and accomplishment. It's perfect, right?! Well, let's see a
// scenario where despite the perfection, the code fails because it gets
// used in unexpected ways.

// Imagine a function 'stretch' that is used to scale the images. In our
// contrived world, let's assume that stretching means doubling the width
// and height.

function stretch(rect) {
  let originalArea = rect.area;
  console.log(`Before stretching, area is: ${originalArea}`);
  rect.setWidth(rect.width * 2);
  rect.setHeight(rect.height * 2);
  console.log(`Expected area: ${4 * originalArea}`); // we scaled by a factor of 4
  console.log(`Actual area: ${rect.area}`);
}

let rect2 = new Rectangle(11, 5);
stretch(rect2);
// this works as expected

// Now, since a square is nothing but a special case of a rectangle, this should
// work for the square as well
let sq3 = new Square(10);
stretch(sq3);

// If you run this code, there's a huge surprise waiting:
// Expected area: 400
// Actual area: 1600

// Now we see the problem. Because of our "clever" hack, the width and height
// for the square got doubled twice, resulting in area that is 4 times the
// expected value!

// This example was not so much a demonstration of the Liskov Substitution principle,
// but of its violation. When we have code that works for base classes but doesn't work
// for derived classes, it causes unexpected bugs that are hard to understand and trace.
// If you are using an object-oriented design, make sure the Liskov Substitution principle
// is adhered to more or less religiously.