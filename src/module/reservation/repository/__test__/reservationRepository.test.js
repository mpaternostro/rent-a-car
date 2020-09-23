const { Sequelize } = require('sequelize');
const ReservationRepository = require('../reservationRepository');
const reservationModel = require('../../model/reservationModel');
const carModel = require('../../../car/model/carModel');
const userModel = require('../../../user/model/userModel');
const createTestReservation = require('../../controller/__test__/reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');
const createTestUser = require('../../../user/controller/__test__/user.fixture');
const ReservationNotDefinedError = require('../../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');
const ReservationNotFoundError = require('../../error/ReservationNotFoundError');

describe('ReservationRepository methods', () => {
  const sequelize = new Sequelize('sqlite::memory');
  const ReservationModel = reservationModel.setup(sequelize);
  carModel.setup(sequelize);
  userModel.setup(sequelize);
  ReservationModel.setupAssociations(carModel, userModel);
  const mockRepository = new ReservationRepository(ReservationModel);

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  test('saves a new reservation in DB', async () => {
    const reservationWithoutId = createTestReservation();
    const { id, status, totalPrice } = await mockRepository.save(reservationWithoutId);
    expect(id).toEqual(1);
    expect(status).toEqual('Confirmed');
    expect(totalPrice).toEqual(3000);
  });

  test('updates a reservation in DB', async () => {
    const reservationWithoutId = createTestReservation();
    const reservationWithId = createTestReservation(1);
    reservationWithId.status = 'Pending';
    reservationWithId.totalPrice = 5000;

    const newReservation = await mockRepository.save(reservationWithoutId);
    const newReservationTwo = await mockRepository.save(reservationWithoutId);
    expect(newReservation.id).toEqual(1);
    expect(newReservationTwo.id).toEqual(2);

    const updatedReservation = await mockRepository.save(reservationWithId);
    expect(updatedReservation.id).toEqual(1);
    expect(updatedReservation.status).toEqual('Pending');
    expect(updatedReservation.totalPrice).toEqual(5000);
  });

  test('save throws an error because of lack of Reservation entity as argument', async () => {
    const reservation = { id: 1, status: 'Confirmed', totalPrice: 3000 };

    await expect(mockRepository.save(reservation)).rejects.toThrowError(ReservationNotDefinedError);
  });

  test('getAll returns every stored reservation in DB', async () => {
    const reservationWithoutId = createTestReservation();
    await mockRepository.save(reservationWithoutId);
    await mockRepository.save(reservationWithoutId);
    const reservations = await mockRepository.getAll();

    expect(reservations).toHaveLength(2);
    expect(reservations[0].id).toEqual(1);
    expect(reservations[1].id).toEqual(2);
  });

  test('getById returns a single reservation with its associated car and user from DB', async () => {
    const reservationWithoutId = createTestReservation();
    const carWithId = createTestCar(1);
    const userWithId = createTestUser(1);
    await carModel.create(carWithId);
    await userModel.create(userWithId);
    await mockRepository.save(reservationWithoutId);

    const { reservation, car, user } = await mockRepository.getById(1);
    expect(reservation.id).toEqual(1);
    expect(car.id).toEqual(1);
    expect(user.id).toEqual(1);
  });

  test('getById returns a single reservation with its associated user and car as Null from DB', async () => {
    const reservationWithoutId = createTestReservation();
    const userWithId = createTestUser(1);
    await userModel.create(userWithId);
    await mockRepository.save(reservationWithoutId);

    const { reservation, car, user } = await mockRepository.getById(1);
    expect(reservation.id).toEqual(1);
    expect(car).toBeNull();
    expect(user.id).toEqual(1);
  });

  test('getById throws an error on undefined reservationId as argument', async () => {
    await expect(mockRepository.getById()).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('getById throws an error because there is no reservation stored in DB with this ID', async () => {
    const reservationId = 2;

    await expect(mockRepository.getById(reservationId)).rejects.toThrowError(
      ReservationNotFoundError
    );
    await expect(mockRepository.getById(reservationId)).rejects.toThrowError(
      `There is no existing reservation with ID ${reservationId}`
    );
  });
});
