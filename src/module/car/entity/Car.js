module.exports = class Car {
  /**
   * @param {number} id
   * @param {string} brand
   * @param {string} model
   * @param {number} year
   * @param {number} kms
   * @param {string} color
   * @param {string} ac
   * @param {number} passengers
   * @param {string} transmission
   * @param {number} price
   * @param {string} createdAt
   * @param {string} updatedAt
   */
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
    this.ac = ac;
    this.passengers = passengers;
    this.transmission = transmission;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};
