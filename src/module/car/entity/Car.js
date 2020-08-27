module.exports = class Car {
  constructor(
    id,
    brand,
    model,
    year,
    kms,
    color,
    ac,
    passengers,
    transmission,
    price,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.ac = ac === 'on' ? 'Yes' : 'No';
    this.passengers = passengers;
    this.transmission = transmission === 'on' ? 'Manual' : 'Automatic';
    this.price = price;
    this.createdAt = createdAt || undefined;
    this.updatedAt = updatedAt || undefined;
  }
};
