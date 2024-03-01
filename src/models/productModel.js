import products from "../db/product.js"

const productModel = {
  listAll: () => {
    return products
  },
  create: (data) => {
    data.id = products[products.length - 1].id + 1
    products.push(data)
    return products
  },
  update: (data) => {
    return products.map((product) => {
      if (product.id == data.id) {
        product.name = data.name || product.name;
        product.email = data.email || product.email
      }
      return product; 
    });
  },
  remove: (id) => {
    return products.filter((data) => data.id != id)
  }
}

export default productModel