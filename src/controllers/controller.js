class Controller {
  constructor(manager, model) {
    this.manager = manager;
    this.model = model;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.manager.create(data);
      return res
        .status(201)
        .json({ message: this.model + " CREATED", response: response._id });
    } catch (error) {
      return next(error);
    }
  };

  createGet = async (req, res, next) => {
    try {
      const { title, photo, category, price } = req.params;
      let { stock } = req.query;
      if (!stock) {
        stock = 0;
      }
      const response = await this.manager.create({
        title,
        photo,
        category,
        price,
        stock,
      });
      return res.status(201).json({ message: "PRODUCT CREATED", response });
    } catch (error) {
      next(error);
    }
  }

  readAll = async (req, res, next) => {
    try {
      const filter = req.query;
      const response = await this.manager.readAll(filter);
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
  };

  read = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.manager.read(pid);
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
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const response = await this.manager.update(pid, data);
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
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.manager.destroy(pid);
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
  };
}

export default Controller;
