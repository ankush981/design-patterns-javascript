/**
 * The Open/Closed principle simply says that once we have written and deployed classes, they
 * should be closed to modification. That's because these classes now have code dependent on
 * them, and making changes, however carefully, might break something.
 *
 * So, classes should be Closed for modification by Open for extension.
 */

// Let's see this with an example
// Suppose we have a Product class in an e-commerce system, and suppose that a product
// has three properties - name, color, and size

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// Let's also create some makeshift enums to make sure the possible values for color
// and size are cast in stone

const Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
});

const Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large'
});

// and now, let's create some objects
let book = new Product('Book', Color.red, Size.small);
let laptop = new Product('laptop', Color.blue, Size.medium);
let surfboard = new Product('Surfboard', Color.green, Size.large);
let products = [book, laptop, surfboard];

// An e-commerce store isn't much use if we can't filter products based on some inputs,
// so let's create a product filter

class ProductFilter {
  filterByColor(products, color) {
    return products.filter(p => p.color === color);
  }

  // assume this method isn't here for now
  filterBySize(products, size) {
    return products.filter(p => p.size === size);
  }
}

// Let's take the code for a spin
let productFilter = new ProductFilter();
let redProducts = productFilter.filterByColor(products, Color.red);
console.log(redProducts);

// this gives us: [ Product { name: 'Book', color: 'red', size: 'small' } ]
// and seems to be working as expected.

// Assume now that the business also wants the ability to filter by size.
// We can do this by adding another method called filterBySize(). But soon,
// we need to filter by both color and size, and soon, filter by color or
// size. You get the idea: the more properties we have, the more possible
// combinations there'll be. There's no way this is going to scale neatly!