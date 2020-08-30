const Car = require('../entity/Car');

exports.fromDbToEntity = ({
  id,
  brand,
  model,
  year,
  kms,
  color,
  ac,
  passengers,
  transmission,
  price,
  created_at: createdAt,
  updated_at: updatedAt,
}) =>
  new Car(
    id,
    brand,
    model,
    year,
    kms,
    color,
    ac,
    passengers,
    transmission,
    price,
    createdAt,
    updatedAt
  );

exports.fromFormToEntity = ({
  id,
  brand,
  model,
  year,
  kms,
  color,
  ac,
  passengers,
  transmission,
  price,
  created_at: createdAt,
}) => new Car(id, brand, model, year, kms, color, ac, passengers, transmission, price, createdAt);
