const Car = require('../../entity/Car');

exports.carWithoutId = new Car(
  undefined,
  'Ford',
  'Fiesta',
  '2017',
  '50000',
  'Blue',
  'No',
  '5',
  'Manual',
  '3000',
  '/img/no-image-available.jpg',
  undefined,
  undefined
);

exports.carWithId = new Car(
  '1',
  'Chevrolet',
  'Onix',
  '2017',
  '50000',
  'Blue',
  'No',
  '5',
  'Manual',
  '3000',
  '/img/no-image-available.jpg',
  undefined,
  undefined
);
