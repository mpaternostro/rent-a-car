const Reservation = require('../entity/Reservation');

exports.fromModelToEntity = ({
  id,
  startDate,
  finishDate,
  pricePerDay,
  totalPrice,
  paymentMethod,
  paid,
  status,
  carId,
  userId,
  createdAt,
  updatedAt,
}) =>
  new Reservation(
    id,
    startDate,
    finishDate,
    pricePerDay,
    totalPrice,
    paymentMethod,
    paid,
    status,
    carId,
    userId,
    createdAt,
    updatedAt
  );

exports.fromFormToEntity = ({
  id,
  'start-date': startDate,
  'finish-date': finishDate,
  'price-per-day': pricePerDay,
  'total-price': totalPrice,
  'payment-method': paymentMethod,
  paid,
  status,
  'car-id': carId,
  'user-id': userId,
  'created-at': createdAt,
}) =>
  new Reservation(
    id,
    startDate,
    finishDate,
    pricePerDay,
    totalPrice,
    paymentMethod,
    Boolean(paid),
    status,
    Number(carId),
    Number(userId),
    createdAt
  );
