const CarService = require('../carService');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const mockService = new CarService(repositoryMock);

describe('CarService methods', () => {
  test("save calls repository's save method", () => {
    mockService.save({});

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith({});
  });

  test("getAll calls repository's getAll method", () => {
    mockService.getAll();

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test("getById calls repository's getById method", () => {
    mockService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test("delete calls repository's delete method", () => {
    mockService.delete({});

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith({});
  });
});
