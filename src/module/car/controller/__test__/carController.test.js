const CarController = require('../carController');
const Car = require('../../entity/Car');

const serviceMock = {
  save: jest.fn(),
  getAll: jest.fn(() => []),
  getById: jest.fn(() => new Car()),
  delete: jest.fn(),
};

const uploadMock = {
  single: jest.fn(),
};

const reqMock = {
  params: { carId: jest.fn() },
};
const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new CarController(serviceMock, uploadMock);

describe('CarController methods', () => {
  afterEach(() => {
    Object.values(serviceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('configures routes for every method', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    mockController.configureRoutes(app);

    expect(app.get).toHaveBeenCalled();
    expect(app.post).toHaveBeenCalled();
    expect(uploadMock.single).toHaveBeenCalled();
  });

  test('index renders index.njk with overall data and last added car', () => {
    mockController.index(reqMock, resMock);

    expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('car/views/index.njk', {
      title: 'Rent a Car',
      cars: [],
      lastAddedCar: undefined,
    });
  });

  test('manage renders manage.njk with a list of cars', () => {
    mockController.manage(reqMock, resMock);

    expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('car/views/manage.njk', {
      title: 'Car List',
      cars: [],
    });
  });

  test('view renders view.njk with a single car', () => {
    mockController.view(reqMock, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('car/views/view.njk', {
      title: 'Viewing undefined undefined undefined',
      car: new Car(),
    });
  });

  test('edit renders a form to edit a car', () => {
    mockController.edit(reqMock, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('car/views/edit.njk', {
      title: 'Editing undefined undefined undefined',
      car: new Car(),
    });
  });

  test('add renders a form to add a new car', () => {
    mockController.add(reqMock, resMock);

    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('car/views/add.njk', {
      title: 'Add New Car',
    });
  });

  test('saves a car with a photo', () => {
    const reqSaveMock = {
      body: {},
      file: { path: '' },
    };

    mockController.save(reqSaveMock, resMock);
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
  });

  test('saves a car without a photo', () => {
    const reqSaveMock = {
      body: {},
    };

    mockController.save(reqSaveMock, resMock);
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
  });

  test('deletes an existing car', () => {
    mockController.delete(reqMock, resMock);

    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
  });
});
