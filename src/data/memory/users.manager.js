import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }
  exists() {
    //verificamos si existe o no existe el archivo, si no existe es un array vacio
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("instance created");
    } else {
      console.log("instance alredy exists");
    }
  }

  //metodo crear
  async createUser(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const all = await this.readAllUsers();
      all.push(data);
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //meotodo que lea el archivo
  async readAllUsers() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      console.log(parseData);
      return parseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //metodo que lea por id
  async readUserId(id) {
    try {
      const all = await this.readAllUsers();
      const one = all.find((each) => each.id === id);
      console.log(one);
      return one;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //metodo actuaizar
  async updateUser(id, newData) {
    try {
      const all = await this.readAllUsers();
      const index = all.findIndex((each) => each.id === id);
      if (index === -1) {
        // usuario no encontrado
        return null;
      }
      // Actualizar los datos del usuario
      // Mezcla de los datos existentes y nuevos
      all[index] = { ...all[index], ...newData };
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      // Devuelve el usuario actualizado
      return all[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //metodo borrar
  async deleteUser(id) {
    try {
      const all = await this.readAllUsers();
      const index = all.findIndex((each) => each.id === id);
      if (index === -1) {
        // User no encontrado
        return null;
      }
      // Eliminar el user
      // Remueve el user del array
      all.splice(index, 1);
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      // Mensaje de confirmación
      return { message: `User ${id} deleted` };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const usersManager = new UsersManager("./src/data/fs/users.json");

export default usersManager;
