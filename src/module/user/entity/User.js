module.exports = class User {
  /**
   * @param {number} id
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} idType
   * @param {number} idNumber
   * @param {string} nationality
   * @param {string} address
   * @param {string} phoneNumber
   * @param {string} email
   * @param {string} birthdate
   * @param {string} createdAt
   * @param {string} updatedAt
   */
  constructor(
    id,
    firstName,
    lastName,
    idType,
    idNumber,
    nationality,
    address,
    phoneNumber,
    email,
    birthdate,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.idType = idType;
    this.idNumber = idNumber;
    this.nationality = nationality;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.birthdate = birthdate;
    this.formattedBirthdate = this.formatBirthdate();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  formatBirthdate() {
    return new Date(this.birthdate).toLocaleString(false, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    });
  }
};
