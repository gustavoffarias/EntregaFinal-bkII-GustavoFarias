import usersManager from "../data/memory/users.manager.js";
import usersMongoManager from "../data/mongo/managers/user.mongo.js";

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const responseManager = await usersManager.createUser(data);
    return res.status(201).json({ message: "USER CREATED", responseManager });
  } catch (error) {
    return next(error);
  }
}

async function readAllUsers(req, res, next) {
  try {
    const response = await usersManager.readAllUsers();
    if (response.length > 0) {
      return res.status(200).json({ message: "ALL USERS", users: response });
    } else {
      const error = new Error("ERROR 404, USERS NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
}

async function createGetUser(req, res, next) {
  try {
    const { photo, email, password } = req.params;
    let { role } = req.query;
    if (!role) {
      role = 0;
    }
    const response = await usersManager.createUser({
      photo,
      email,
      password,
      role,
    });
    return res.status(201).json({ message: "USER CREATED", response });
  } catch (error) {
    next(error);
  }
}

async function readUserId(req, res, next) {
  try {
    // Obtener el ID del usuario
    const { uid } = req.params;
    const response = await usersManager.readUserId(uid);
    if (response) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("ERROR 404, USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    // Obtener los datos de actualización del cuerpo de la solicitud
    const updateData = req.body;
    // Llamar al método update de usersManager
    const response = await usersManager.updateUser(uid, updateData);
    if (response) {
      return res.status(200).json({ message: "USER UPDATED", response });
    } else {
      const error = new Error("ERROR 404, USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { uid } = req.params;
    // Llamar al método delete de usersManager
    const response = await usersManager.deleteUser(uid);
    if (response) {
      return res.status(200).json({ message: "USER DELETED", response });
    } else {
      const error = new Error("ERROR 404, USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
}

const registerView = async (req, res, next) => {
  try {
    const user = await usersManager.readAllUsers();
    return res.render("register");
  } catch (error) {
    return next(error);
  }
};

//Con Mongo
async function create(req, res, next) {
  try {
    const data = req.body;
    const response = await usersMongoManager.create(data);
    return res
      .status(201)
      .json({ message: "PRODUCT CREATED", response: response._id });
  } catch (error) {
    return next(error);
  }
}

async function readAll(req, res, next) {
  try {
    const response = await usersMongoManager.readAll();
    if (response) {
      return res.status(200).json({ message: "PRODUCTS READ", response });
    } else {
      const error = new Error("PRODUCTS NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await usersMongoManager.read(pid);
    if (response) {
      return res.status(200).json({ message: "PRODUCT READ", response });
    } else {
      const error = new Error("PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await usersMongoManager.update(pid, data);
    if (response) {
      return res.status(200).json({ message: "PRODUCT UPDATE", response });
    } else {
      const error = new Error("PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await usersMongoManager.destroy(pid);
    if (response) {
      return res.status(200).json({ message: "PRODUCT DELETED", response });
    } else {
      const error = new Error("PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export {
  createUser,
  createGetUser,
  readAllUsers,
  readUserId,
  updateUser,
  deleteUser,
  registerView,
  create,
  readAll,
  read,
  update,
  destroy,
};
