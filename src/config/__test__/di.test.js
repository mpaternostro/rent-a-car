const configureDI = require('../di');

describe('DI is loading the right dependencies', () => {
  const container = configureDI();
  const { definitions } = container;

  test('DI is loading the right top level dependencies', () => {
    expect(definitions).toHaveProperty('Sequelize');
    expect(definitions).toHaveProperty('Multer');
    expect(definitions).toHaveProperty('CarController');
    expect(definitions).toHaveProperty('CarService');
    expect(definitions).toHaveProperty('CarRepository');
    expect(definitions).toHaveProperty('CarModel');
    expect(definitions).toHaveProperty('UserController');
    expect(definitions).toHaveProperty('UserService');
    expect(definitions).toHaveProperty('UserRepository');
    expect(definitions).toHaveProperty('UserModel');
    expect(definitions).toHaveProperty('ReservationController');
    expect(definitions).toHaveProperty('ReservationService');
    expect(definitions).toHaveProperty('ReservationRepository');
    expect(definitions).toHaveProperty('ReservationModel');
  });

  test('CarController is constructed with the right dependencies', () => {
    const { CarController } = definitions;
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'CarService' }),
      expect.objectContaining({ existingDefinitionName: 'Multer' }),
    ];
    expect(CarController.deps).toEqual(expect.arrayContaining(expected));
  });

  test('CarService is constructed with the right dependencies', () => {
    const { CarService } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'CarRepository' })];
    expect(CarService.deps).toEqual(expect.arrayContaining(expected));
  });

  test('CarRepository is constructed with the right dependencies', () => {
    const { CarRepository } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'CarModel' })];
    expect(CarRepository.deps).toEqual(expect.arrayContaining(expected));
  });

  test('UserController is constructed with the right dependencies', () => {
    const { UserController } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'UserService' })];
    expect(UserController.deps).toEqual(expect.arrayContaining(expected));
  });

  test('UserService is constructed with the right dependencies', () => {
    const { UserService } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'UserRepository' })];
    expect(UserService.deps).toEqual(expect.arrayContaining(expected));
  });

  test('UserRepository is constructed with the right dependencies', () => {
    const { UserRepository } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'UserModel' })];
    expect(UserRepository.deps).toEqual(expect.arrayContaining(expected));
  });

  test('ReservationController is constructed with the right dependencies', () => {
    const { ReservationController } = definitions;
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'ReservationService' }),
      expect.objectContaining({ existingDefinitionName: 'CarService' }),
      expect.objectContaining({ existingDefinitionName: 'UserService' }),
    ];
    expect(ReservationController.deps).toEqual(expect.arrayContaining(expected));
  });

  test('ReservationService is constructed with the right dependencies', () => {
    const { ReservationService } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'ReservationRepository' })];
    expect(ReservationService.deps).toEqual(expect.arrayContaining(expected));
  });

  test('ReservationRepository is constructed with the right dependencies', () => {
    const { ReservationRepository } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'ReservationModel' })];
    expect(ReservationRepository.deps).toEqual(expect.arrayContaining(expected));
  });
});
