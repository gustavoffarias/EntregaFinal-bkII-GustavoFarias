class Controller {
  constructor(manager, model) {
    this.manager = manager;
    this.model = model;
  }

  async create(req, res, next) {
    try {
      const data = req.body;
      const response = await this.model.create(data);
      return res
        .status(201)
        .json({ message: this.model + " CREATED", response: response._id });
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req, res, next) {
    try {
      const filter = req.query;
      const response = await this.model.readAll(filter);
      if (response) {
        return res
          .status(200)
          .json({ message: this.model + " READ", response });
      } else {
        const error = new Error(this.model + " NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async read(req, res, next) {
    try {
      const { pid } = req.params;
      const response = await this.model.read(pid);
      if (response) {
        return res
          .status(200)
          .json({ message: this.model + " READ", response });
      } else {
        const error = new Error(this.model + " NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const response = await this.model.update(pid, data);
      if (response) {
        return res
          .status(200)
          .json({ message: this.model + " UPDATE", response });
      } else {
        const error = new Error(this.model + " NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const response = await this.model.destroy(pid);
      if (response) {
        return res
          .status(200)
          .json({ message: this.model + " DELETED", response });
      } else {
        const error = new Error(this.model + " NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default Controller;
