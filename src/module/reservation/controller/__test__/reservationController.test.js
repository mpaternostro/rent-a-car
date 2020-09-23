const ReservationController = require('../reservationController');
const createTestReservation = require('./reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');
const createTestUser = require('../../../user/controller/__test__/user.fixture');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');

const reservationServiceMock = {
  save: jest.fn(),
  finish: jest.fn(),
  unblock: jest.fn(),
  pay: jest.fn(),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestReservation(id + 1))),
  getById: jest.fn((id) => {
    return {
      reservation: createTestReservation(id),
      car: createTestCar(1),
      user: createTestUser(1),
    };
  }),
};

const carServiceMock = {
  getAll: jest.fn(),
  getById: jest.fn(() => {
    return {
      car: undefined,
    };
  }),
};

const userServiceMock = {
  getAll: jest.fn(),
};

const reqMock = {
  params: { reservationId: 1 },
};
const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new ReservationController(
  reservationServiceMock,
  carServiceMock,
  userServiceMock
);

describe('ReservationController methods', () => {
  afterEach(() => {
    Object.values(reservationServiceMock).forEach((mockFn) => mockFn.mockClear());
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

  test('manage renders manage.njk with a list of reservations', async () => {
    const reservations = reservationServiceMock.getAll();
    await mockController.manage(reqMock, resMock);

    expect(reservationServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('reservation/views/manage.njk', {
      title: 'Reservation List',
      reservations,
    });
  });

  test('view renders view.njk with a single reservation', async () => {
    const { reservation, car, user } = reservationServiceMock.getById(1);
    await mockController.view(reqMock, resMock);

    expect(reservationServiceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('reservation/views/view.njk', {
      title: 'Viewing Reservation #1',
      reservation,
      car,
      user,
    });
  });

  test('view throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      mockController.view(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('edit renders a form to edit a reservation', async () => {
    const { reservation } = reservationServiceMock.getById(1);
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();
    await mockController.edit(reqMock, resMock);

    expect(reservationServiceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('reservation/views/edit.njk', {
      title: 'Editing Reservation #1',
      reservation,
      cars,
      users,
    });
  });

  test('edit throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      mockController.edit(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('add renders a form to add a new reservation', async () => {
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();
    await mockController.add(reqMock, resMock);

    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('reservation/views/add.njk', {
      title: 'Add New Reservation',
      cars,
      users,
    });
  });

  test('saves a reservation', async () => {
    const reqSaveMock = {
      body: {
        id: 1,
        'start-date': '2020-10-05T15:00',
        'finish-date': '2020-10-08T15:00',
        'price-per-day': 1000,
        'total-price': 3000,
        'payment-method': 'Cash',
        paid: true,
        status: 'Confirmed',
        'car-id': '1',
        'user-id': '1',
      },
    };

    await mockController.save(reqSaveMock, resMock);
    expect(reservationServiceMock.save).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.save).toHaveBeenCalledWith(createTestReservation(1), undefined);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
  });

  test('mark a reservation as finished', async () => {
    const reservation = createTestReservation(1);
    await mockController.finish(reqMock, resMock);

    expect(reservationServiceMock.finish).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.finish).toHaveBeenCalledWith(reservation);
  });

  test('finish throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      mockController.finish(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('unblock a finished reservation', async () => {
    const reservation = createTestReservation(1);
    await mockController.unblock(reqMock, resMock);

    expect(reservationServiceMock.unblock).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.unblock).toHaveBeenCalledWith(reservation);
  });

  test('unblock throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      mockController.unblock(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('pay a finished reservation', async () => {
    const reservation = createTestReservation(1);
    await mockController.pay(reqMock, resMock);

    expect(reservationServiceMock.pay).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.pay).toHaveBeenCalledWith(reservation);
  });

  test('pay throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      mockController.pay(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });
});
