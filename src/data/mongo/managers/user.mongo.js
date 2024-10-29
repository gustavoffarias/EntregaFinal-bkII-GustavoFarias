import User from "../models/user.model.js";

class UsersMongoManager {
  async create(data) {
    try {
      const one = await User.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readAll() {
    try {
      const all = await User.find();
      return all;
    } catch (error) {
      throw error;
    }
  }

  async read(pid) {
    try {
      const one = await User.findById(pid);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(pid, data) {
    try {
      const opts = { new: true };
      const one = await User.findByIdAndUpdate(pid, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(pid) {
    try {
      const one = await User.findByIdAndDelete(pid);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const UsersMongoManager = new UsersMongoManager();
export default UsersMongoManager;
