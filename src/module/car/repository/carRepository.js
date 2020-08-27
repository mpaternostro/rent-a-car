const { fromDbToEntity } = require('../mapper/carMapper');

module.exports = class CarRepository {
  /**
   * @param {import('better-sqlite3').Database} database
   */
  constructor(database) {
    this.database = database;
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
      const stmt = this.database.prepare(
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
    const stmt = this.database.prepare(
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
};
