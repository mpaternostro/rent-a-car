module.exports = class CarController {
  constructor(carService) {
    this.carService = carService;
  }

  configureRoutes(app) {
    app.get('/', this.index.bind(this));
  }

  save() {
    // TRAE LA DATA DE UN FORMULARIO Y LLAMA A OTRA FUNCION PARA QUE GUARDE UN NUEVO AUTO EN LA DB
  }

  index(req, res) {
    res.render('index.njk', {
      title: 'Rent a Car',
    });
  }
};
