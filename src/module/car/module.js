module.exports = function init(app, container) {
  const CarController = container.get('CarController');
  CarController.configureRoutes(app);
};
