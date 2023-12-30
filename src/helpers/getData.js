const { faker } = require("@faker-js/faker");
const branchOffice = require("../resource/branchOffice.json");

const generateRandomProducts = (count) => {
  const products = [];
  const sucursales = branchOffice.map((office) => office.id);

  for (let i = 1; i <= count; i++) {
    const product = {
      id: i,
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price(),
      stock: faker.number.int({ min: 1, max: 100 }),
      sucursal: faker.helpers.arrayElement(sucursales),
    };

    products.push(product);
  }

  return products;
};
const generateRandomClients = (count) => {
  const clients = [];

  for (let i = 1; i <= count; i++) {
    const client = {
      rut: faker.number.int({ min: 1000000, max: 99999999 }),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
    };

    clients.push(client);
  }

  return clients;
};
const generateRandomSuppliers = (count) => {
  const suppliers = [];

  for (let i = 1; i <= count; i++) {
    const supplier = {
      rut: faker.number.int({ min: 1000000, max: 99999999 }),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      birthDate: faker.date.past(),
      web: faker.internet.url(),
    };

    suppliers.push(supplier);
  }

  return suppliers;
};

module.exports = {
  generateRandomProducts,
  generateRandomClients,
  generateRandomSuppliers,
};
