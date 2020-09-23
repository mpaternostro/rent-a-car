const { Sequelize } = require('sequelize');
const UserRepository = require('../userRepository');
const userModel = require('../../model/userModel');
const reservationModel = require('../../../reservation/model/reservationModel');
const createTestUser = require('../../controller/__test__/user.fixture');
const createTestReservation = require('../../../reservation/controller/__test__/reservation.fixture');
const UserNotDefinedError = require('../../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');
const UserNotFoundError = require('../../error/UserNotFoundError');

describe('UserRepository methods', () => {
  const sequelize = new Sequelize('sqlite::memory');
  const UserModel = userModel.setup(sequelize);
  const ReservationModel = reservationModel.setup(sequelize);
  UserModel.hasMany(ReservationModel, { foreignKey: 'userId' });
  ReservationModel.belongsTo(UserModel, { foreignKey: 'userId' });
  const mockRepository = new UserRepository(UserModel);

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  test('saves a new user in DB', async () => {
    const userWithoutId = createTestUser();
    const { id, firstName, lastName } = await mockRepository.save(userWithoutId);
    expect(id).toEqual(1);
    expect(firstName).toEqual('Juan');
    expect(lastName).toEqual('Lopez');
  });

  test('updates a user in DB', async () => {
    const userWithoutId = createTestUser();
    const userWithId = createTestUser(1);
    userWithId.firstName = 'Luis';
    userWithId.lastName = 'Gomez';

    const newUser = await mockRepository.save(userWithoutId);
    const newUserTwo = await mockRepository.save(userWithoutId);
    expect(newUser.id).toEqual(1);
    expect(newUserTwo.id).toEqual(2);

    const updatedUser = await mockRepository.save(userWithId);
    expect(updatedUser.id).toEqual(1);
    expect(updatedUser.firstName).toEqual('Luis');
    expect(updatedUser.lastName).toEqual('Gomez');
  });

  test('save throws an error because of lack of User entity as argument', async () => {
    const user = { id: 1, firstName: 'Juan', lastName: 'Lopez' };

    await expect(mockRepository.save(user)).rejects.toThrowError(UserNotDefinedError);
  });

  test('getAll returns every stored user in DB', async () => {
    const userWithoutId = createTestUser();
    await mockRepository.save(userWithoutId);
    await mockRepository.save(userWithoutId);
    const users = await mockRepository.getAll();

    expect(users).toHaveLength(2);
    expect(users[0].id).toEqual(1);
    expect(users[1].id).toEqual(2);
  });

  test('getById returns a single user and its reservations from DB', async () => {
    const userWithoutId = createTestUser();
    const reservationWithoutId = createTestReservation();
    await mockRepository.save(userWithoutId);
    await mockRepository.save(userWithoutId);

    const userInstance = await mockRepository.userModel.findByPk(2);
    await userInstance.createReservation(reservationWithoutId);
    await userInstance.createReservation(reservationWithoutId);

    const { user, reservations } = await mockRepository.getById(2);
    expect(user.id).toEqual(2);
    expect(reservations).toHaveLength(2);
  });

  test('getById throws an error on undefined userId as argument', async () => {
    await expect(mockRepository.getById()).rejects.toThrowError(UserIdNotDefinedError);
  });

  test('getById throws an error because there is no user stored in DB with this ID', async () => {
    const userId = 2;

    await expect(mockRepository.getById(userId)).rejects.toThrowError(UserNotFoundError);
    await expect(mockRepository.getById(userId)).rejects.toThrowError(
      `There is no existing user with ID ${userId}`
    );
  });
});
