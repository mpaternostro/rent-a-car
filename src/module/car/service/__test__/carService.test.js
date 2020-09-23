const CarService = require('../carService');
const createTestCar = require('../../controller/__test__/cars.fixture');
const CarNotDefinedError = require('../../error/CarNotDefinedError');
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getCarsLength: jest.fn(),
  getLastCar: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const mockService = new CarService(repositoryMock);

describe('CarService methods', () => {
  test("save calls repository's save method", async () => {
    const car = createTestCar(1);
    await mockService.save(car);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(car);
  });

  test('save throws an error because of lack of Car entity as argument', async () => {
    await expect(mockService.save({ id: 1, brand: 'Ford', model: 'Fiesta' })).rejects.toThrowError(
      CarNotDefinedError
    );
  });

  test("getAll calls repository's getAll method", async () => {
    await mockService.getAll();

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test("getCarsLength calls repository's getCarsLength method", async () => {
    await mockService.getCarsLength();

    expect(repositoryMock.getCarsLength).toHaveBeenCalledTimes(1);
  });

  test("getLastCar calls repository's getLastCar method", async () => {
    await mockService.getLastCar();

    expect(repositoryMock.getLastCar).toHaveBeenCalledTimes(1);
  });

  test("getById calls repository's getById method", async () => {
    await mockService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test('getById throws an error on undefined carId as argument', async () => {
    await expect(mockService.getById()).rejects.toThrowError(CarIdNotDefinedError);
  });

  test("delete calls repository's delete method", async () => {
    const car = createTestCar(1);
    await mockService.delete(car);

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(car);
  });

  test('delete throws an error because of lack of Car entity as argument', async () => {
    await expect(
      mockService.delete({ id: 1, brand: 'Ford', model: 'Fiesta' })
    ).rejects.toThrowError(CarNotDefinedError);
  });
});
