module.exports = class CarRepository {
  constructor(database) {
    this.database = database;
  }

  save(car) {
    // RECIBE DATOS DE UN AUTO, SE FIJA SI ES UNO NUEVO O UNO PREEXISTENTE Y LO AGREGA/MODIFICA
    const { id } = car;
    if (id) {
      // Modificar auto
    } else {
      // Crear nuevo auto
    }
  }
};
