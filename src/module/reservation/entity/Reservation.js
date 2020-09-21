module.exports = class Reservation {
  /**
   * @param {number} id
   * @param {string} startDate
   * @param {string} finishDate
   * @param {number} pricePerDay
   * @param {number} totalPrice
   * @param {string} paymentMethod
   * @param {boolean} paid
   * @param {string} status
   * @param {number} carId
   * @param {number} userId
   * @param {string} createdAt
   * @param {string} updatedAt
   */
  constructor(
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
  ) {
    this.id = id;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.formattedDates = this.formatDate();
    this.pricePerDay = pricePerDay;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.paid = paid;
    this.status = status;
    this.carId = carId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  formatDate() {
    const [startDate, finishDate] = [this.startDate, this.finishDate].map((date) =>
      new Date(date).toLocaleString(false, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    );
    return { startDate, finishDate };
  }

  calculateReservationLength() {
    const MILISECONDS_IN_A_DAY = 86400000;
    return Math.ceil(
      (new Date(this.finishDate).getTime() - new Date(this.startDate).getTime()) /
        MILISECONDS_IN_A_DAY
    );
  }

  /**
   * @param {import('../../car/entity/Car')} car
   * @param {number} pricePerDay
   */
  fillReservationPrice(car, pricePerDay) {
    this.pricePerDay = pricePerDay || car.price;
    this.totalPrice = this.pricePerDay * this.calculateReservationLength();
  }

  /**
   * @param {boolean} isFinished
   */
  fillReservationStatus(isFinished) {
    if (isFinished) {
      this.status = 'Finished';
      return;
    }
    this.status = this.paid ? 'Confirmed' : 'Pending';
  }

  /**
   * @param {boolean} isFinished
   */
  payReservation() {
    this.paid = true;
  }
};
