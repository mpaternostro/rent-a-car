const { Sequelize } = require('sequelize');
const CarRepository = require('../carRepository');
const carModel = require('../../model/carModel');
const { carWithoutId, carWithId } = require('./cars.fixture');

describe('CarRepository methods', () => {
  const sequelize = new Sequelize('sqlite::memory');
  const car = carModel.setup(sequelize);
  const repository = new CarRepository(car);

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  test('saves a new car in DB', async () => {
    const { id, brand, model } = await repository.save(carWithoutId);
    expect(id).toEqual(1);
    expect(brand).toEqual('Ford');
    expect(model).toEqual('Fiesta');
  });

  test('updates a car in DB', async () => {
    const newCar = await repository.save(carWithoutId);
    expect(newCar.id).toEqual(1);
    expect(newCar.brand).toEqual('Ford');
    expect(newCar.model).toEqual('Fiesta');

    const newCarTwo = await repository.save(carWithoutId);
    expect(newCarTwo.id).toEqual(2);
    expect(newCarTwo.brand).toEqual('Ford');
    expect(newCarTwo.model).toEqual('Fiesta');

    const updatedCar = await repository.save(carWithId);
    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.brand).toEqual('Chevrolet');
    expect(updatedCar.model).toEqual('Onix');
  });

  test('getAll returns every car stored in DB', async () => {
    await repository.save(carWithoutId);
    await repository.save(carWithoutId);
    const cars = await repository.getAll();

    expect(cars).toHaveLength(2);
    expect(cars[0].id).toEqual(1);
    expect(cars[1].id).toEqual(2);
  });

  test('deletes an existing car in DB and returns true', async () => {
    await repository.save(carWithoutId);
    await repository.save(carWithoutId);
    await repository.save(carWithoutId);

    const deletedCar = await repository.delete({ id: 2 });
    const remainingCars = await repository.getAll();

    expect(deletedCar).toEqual(true);
    expect(remainingCars[0].id).toEqual(1);
    expect(remainingCars[1].id).toEqual(3);
  });

  test('tries to delete non-existent car in DB and returns false', async () => {
    await repository.save(carWithoutId);
    await repository.save(carWithoutId);
    await repository.save(carWithoutId);

    const deletedCar = await repository.delete({ id: 4 });
    const remainingCars = await repository.getAll();

    expect(deletedCar).toEqual(false);
    expect(remainingCars[0].id).toEqual(1);
    expect(remainingCars[1].id).toEqual(2);
  });
});
