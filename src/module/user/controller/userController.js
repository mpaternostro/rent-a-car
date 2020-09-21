const { fromFormToEntity } = require('../mapper/userMapper');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');

module.exports = class userController {
  /**
   * @param {import('../service/userService')} userService
   */
  constructor(userService) {
    this.userService = userService;
    this.ROUTE_BASE = '/user';
    this.USER_VIEWS = 'user/views';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}/manage`, this.manage.bind(this));
    app.get(`${ROUTE}/view/:userId`, this.view.bind(this));
    app.get(`${ROUTE}/edit/:userId`, this.edit.bind(this));
    app.get(`${ROUTE}/add`, this.add.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async manage(req, res) {
    const users = await this.userService.getAll();
    res.render(`${this.USER_VIEWS}/manage.njk`, {
      title: 'User List',
      users,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { userId } = req.params;
    if (!Number(userId)) {
      throw new UserIdNotDefinedError();
    }

    const { user, reservations } = await this.userService.getById(userId);
    res.render(`${this.USER_VIEWS}/view.njk`, {
      title: `Viewing User #${user.id}`,
      user,
      reservations,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    const { userId } = req.params;
    if (!Number(userId)) {
      throw new UserIdNotDefinedError();
    }

    const { user } = await this.userService.getById(userId);
    res.render(`${this.USER_VIEWS}/edit.njk`, {
      title: `Editing User #${user.id}`,
      user,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  add(req, res) {
    res.render(`${this.USER_VIEWS}/add.njk`, {
      title: 'Add New User',
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    const user = fromFormToEntity(req.body);
    await this.userService.save(user);
    res.redirect(`${this.ROUTE_BASE}/manage`);
  }
};
