const fs = require('fs');

const Database = require('better-sqlite3');
const CarRepository = require('../carRepository');
const { carWithoutId, carWithId } = require('./cars.fixture');

describe('CarRepository methods', () => {
  let db;
  /**
   * @type {CarRepository}
   */
  let repository;

  beforeEach(() => {
    const stmt = fs.readFileSync('./src/config/setup.sql', 'utf-8');
    db = new Database(':memory:');
    repository = new CarRepository(db);
    repository.databaseAdapter.exec(stmt);
  });

  test('saves a new car in DB and retrieves this car with getById', () => {
    const { id, brand, model } = repository.save(carWithoutId);
    expect(id).toEqual(1);
    expect(brand).toEqual('Ford');
    expect(model).toEqual('Fiesta');
  });

  test('updates a car in DB and retrieves this car with getById', () => {
    const newCar = repository.save(carWithoutId);
    expect(newCar.id).toEqual(1);
    expect(newCar.brand).toEqual('Ford');
    expect(newCar.model).toEqual('Fiesta');

    const newCarTwo = repository.save(carWithoutId);
    expect(newCarTwo.id).toEqual(2);
    expect(newCarTwo.brand).toEqual('Ford');
    expect(newCarTwo.model).toEqual('Fiesta');

    const updatedCar = repository.save(carWithId);
    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.brand).toEqual('Chevrolet');
    expect(updatedCar.model).toEqual('Onix');
  });

  test('getAll returns every car in DB', () => {
    repository.save(carWithoutId);
    repository.save(carWithoutId);
    const cars = repository.getAll();

    expect(cars).toHaveLength(2);
    expect(cars[0].id).toEqual(1);
    expect(cars[1].id).toEqual(2);
  });

  test('deletes an existing car in DB and returns the deleted car', () => {
    repository.save(carWithoutId);
    repository.save(carWithoutId);
    repository.save(carWithoutId);

    const carToDelete = repository.getById(2);
    const deletedCar = repository.delete(carToDelete);
    const remainingCars = repository.getAll();

    expect(deletedCar.id).toEqual(2);
    expect(remainingCars[0].id).toEqual(1);
    expect(remainingCars[1].id).toEqual(3);
  });
});
