//import usersManager from "../data/memory/users.manager.js";
//import usersMongoManager from "../data/mongo/managers/user.mongo.js";
//import Controller from "./controller.js";

import * as services from "../services/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      message: 'Register OK',
      session: req.session
    })
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    //req.session.passport.user
    const id = req.session.passport.user || null;
    const user = await services.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/*
//Con File System
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

/*async function createGetUser(req, res, next) {
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
const usersController = new Controller(usersMongoManager, "USERS");
const { create, createGet, readAll, read, update, destroy } = usersController;

//Backend2
const users = [
  {
    firstName: "Gustavo",
    password: "0909",
    admin: true,
  },
  {
    firstName: "Lorenzo",
    password: "2323",
    admin: false,
  },
  {
    firstName: "Emilse",
    password: "0707",
    admin: false,
  },
];

export const login = (req, res) => {
  const { firstName, password } = req.body;
  const index = users.findIndex(
    (user) => user.firstName === firstName && user.password === password
  );
  if (index < 0) res.status(401).json({ msg: "Credenciales incorrectas" });
  else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      count: 1,
      firstName: user.firstName,
      admin: user.admin,
    };

    //req.session.leggedIn = true
    //req.session.admin = user.admin
    res.json({ msg: "bienvenido!" });
  }
};

export const secretEndpoint = (req, res) => {
  req.session.info.count++;
  res.json({
    msg: "endpoint secreto",
    contador: req.session.info.count,
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.json({ msg: "logout ok" });
};

export {
  createUser,
  createGet,
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
*/