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
  img,
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
    img,
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
  img,
  'created-at': createdAt,
}) =>
  new Car(id, brand, model, year, kms, color, ac, passengers, transmission, price, img, createdAt);
