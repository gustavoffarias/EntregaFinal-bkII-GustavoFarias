class MongoManager {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readAll = async (filter) => {
    try {
      const all = await this.model.find(filter);
      return all;
    } catch (error) {
      throw error;
    }
  };

  read = async (pid) => {
    try {
      const one = await this.model.findById(pid);
      return one;
    } catch (error) {
      throw error;
    }
  };

  update = async (pid, data) => {
    try {
      const opts = { new: true };
      const one = await this.model.findByIdAndUpdate(pid, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (pid) => {
    try {
      const one = await this.model.findByIdAndDelete(pid);
      return one;
    } catch (error) {
      throw error;
    }
  };
}

export default MongoManager;
