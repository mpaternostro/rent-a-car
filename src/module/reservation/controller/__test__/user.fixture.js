const User = require('../../entity/User');

module.exports = function createTestUser(id) {
  return new User(
    id,
    'Juan',
    'Lopez',
    'DNI',
    40000000,
    'Argentina',
    'Av. 9 de Julio 1000',
    '+54 911 1234 5678',
    'juan@test.com',
    '1990-12-24',
    '2020-09-16T14:11:13.854Z',
    '2020-09-16T14:11:13.854Z'
  );
};
