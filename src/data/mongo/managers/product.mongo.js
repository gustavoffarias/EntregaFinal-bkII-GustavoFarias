import Product from "../models/product.model.js";

class ProductsMongoManager {
  async create(data) {
    try {
      const one = await Product.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  readAll() {
    try {
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
    } catch (error) {
      throw error;
    }
  }

  update() {
    try {
    } catch (error) {
      throw error;
    }
  }

  destroy() {
    try {
    } catch (error) {
      throw error;
    }
  }
}

const productsMongoManager = new ProductsMongoManager();
export default productsMongoManager;
