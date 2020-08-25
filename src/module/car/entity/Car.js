module.exports = class Car {
  constructor(brand, model, year, kms, color, ac, passengers, transmission) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.ac = ac;
    this.passengers = passengers;
    this.transmission = transmission;
  }
};
