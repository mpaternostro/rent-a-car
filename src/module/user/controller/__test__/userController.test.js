const UserController = require('../userController');
const createTestUser = require('./user.fixture');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');

const serviceMock = {
  save: jest.fn(),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestUser(id + 1))),
  getById: jest.fn((id) => {
    return {
      user: createTestUser(id),
      reservations: Array.from({ length: 3 }, (reservationId) => {
        return {
          id: reservationId + 1,
          carId: '1',
        };
      }),
    };
  }),
};

const reqMock = {
  params: { userId: 1 },
};
const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new UserController(serviceMock);

describe('UserController methods', () => {
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
  });

  test('manage renders manage.njk with a list of users', async () => {
    const users = serviceMock.getAll();
    await mockController.manage(reqMock, resMock);

    expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('user/views/manage.njk', {
      title: 'User List',
      users,
    });
  });

  test('view renders view.njk with a single user and its reservations', async () => {
    const { user, reservations } = serviceMock.getById(1);
    await mockController.view(reqMock, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('user/views/view.njk', {
      title: 'Viewing User #1',
      user,
      reservations,
    });
  });

  test('view throws an error on undefined userId as argument', async () => {
    const reqMockWithoutUserId = {
      params: {},
    };

    await expect(() => mockController.view(reqMockWithoutUserId, resMock)).rejects.toThrowError(
      UserIdNotDefinedError
    );
  });

  test('edit renders a form to edit a user', async () => {
    const { user } = serviceMock.getById(1);
    await mockController.edit(reqMock, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('user/views/edit.njk', {
      title: 'Editing User #1',
      user,
    });
  });

  test('edit throws an error on undefined userId as argument', async () => {
    const reqMockWithoutUserId = {
      params: {},
    };

    await expect(() => mockController.edit(reqMockWithoutUserId, resMock)).rejects.toThrowError(
      UserIdNotDefinedError
    );
  });

  test('add renders a form to add a new user', () => {
    mockController.add(reqMock, resMock);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('user/views/add.njk', {
      title: 'Add New User',
    });
  });

  test('saves a user', async () => {
    const reqSaveMock = {
      body: {},
    };

    await mockController.save(reqSaveMock, resMock);
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
  });
});
