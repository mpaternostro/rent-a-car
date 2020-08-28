const { fromDbToEntity } = require('../mapper/carMapper');

module.exports = class CarRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param {import('../entity/Car')} car
   */
  save(car) {
    // RECIBE DATOS DE UN AUTO, SE FIJA SI ES UNO NUEVO O UNO PREEXISTENTE Y LO AGREGA/MODIFICA
    const { id, brand, model, year, kms, color, ac, passengers, transmission, price } = car;
    if (id) {
      // Modificar auto
    } else {
      // Crear nuevo auto
      const stmt = this.databaseAdapter.prepare(
        `INSERT INTO cars(
          brand,
          model,
          year,
          kms,
          color,
          ac,
          passengers,
          transmission,
          price
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      stmt.run(brand, model, year, kms, color, ac, passengers, transmission, price);
    }
  }

  getAll() {
    const stmt = this.databaseAdapter.prepare(
      `SELECT
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
        created_at,
        updated_at
        FROM cars`
    );
    const cars = stmt.all().map((car) => fromDbToEntity(car));
    return cars;
  }

  /**
   * @param {number} carId
   */
  getById(carId) {
    const stmt = this.databaseAdapter.prepare(
      `SELECT
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
        created_at,
        updated_at
        FROM cars
        WHERE id = ?`
    );
    const carData = stmt.get(carId);
    return fromDbToEntity(carData);
  }
};
