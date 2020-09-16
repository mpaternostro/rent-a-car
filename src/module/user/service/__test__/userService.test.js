const UserService = require('../userService');
const createTestUser = require('../../controller/__test__/user.fixture');
const UserNotDefinedError = require('../../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const mockService = new UserService(repositoryMock);

describe('UserService methods', () => {
  test("save calls repository's save method", async () => {
    const user = createTestUser(1);
    await mockService.save(user);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(user);
  });

  test('save throws an error because of lack of User entity as argument', async () => {
    const user = { id: 1, firstName: 'Juan', lastName: 'Lopez' };

    await expect(mockService.save(user)).rejects.toThrowError(UserNotDefinedError);
  });

  test("getAll calls repository's getAll method", async () => {
    await mockService.getAll();

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test("getById calls repository's getById method", async () => {
    await mockService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test('getById throws an error on undefined userId as argument', async () => {
    await expect(mockService.getById()).rejects.toThrowError(UserIdNotDefinedError);
  });
});
