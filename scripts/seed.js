const {
  generateRandomClients,
  generateRandomProducts,
  generateRandomSuppliers,
} = require("../src/helpers/getData");
const branchOffice = require("../src/resource/branchOffice.json");

const { db } = require("@vercel/postgres");

// db connection

async function seedBranchOffices(client) {
  try {
    // create table sucursales if not exists
    const createTable = await client.query(`
        CREATE TABLE IF NOT EXISTS sucursales (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            currency VARCHAR(3) NOT NULL
        );
    `);

    console.log(`Created "sucursales" table`);

    const sucursales = branchOffice;

    // insert data "sucursales"
    const insertedBranchOffices = await Promise.all(
      sucursales.map(async (sucursal) => {
        return client.query(
          `
            INSERT INTO sucursales (name, currency)
            VALUES ($1, $2)
            RETURNING *;
        `,
          [sucursal.name, sucursal.currency]
        );
      })
    );

    console.log(`Seeded ${insertedBranchOffices.length} branch offices`);

    return {
      createTable,
      branchOffices: insertedBranchOffices,
    };
  } catch (error) {
    console.error("Error seeding branch offices:", error);
    throw error;
  }
}

async function seedClients(client) {
  try {
    // create table "clients" if not exists
    const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS clients (
      rut VARCHAR(20) PRIMARY KEY,
      name VARCHAR(255),
      lastName VARCHAR(255),
      address VARCHAR(255),
      phone VARCHAR(36)
    );
  `);

    console.log(`Created "clients" table`);

    const clients = generateRandomClients(100);

    // insert data in table "clients"
    const insertedClients = await Promise.all(
      clients.map(async (cliente) => {
        return client.query(
          `
        INSERT INTO clients (rut, name, lastName, address, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
          [
            cliente.rut,
            cliente.name,
            cliente.lastName,
            cliente.address,
            cliente.phone,
          ]
        );
      })
    );

    console.log(`Seeded ${insertedClients.length} clients`);

    return {
      createTable,
      clients: insertedClients,
    };
  } catch (error) {
    console.error("Error seeding clients:", error);
    throw error;
  }
}

async function seedSuppliers(client) {
  try {
    // create table suppliers if not exists
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        rut VARCHAR(20) PRIMARY KEY,
        name VARCHAR(255),
        lastName VARCHAR(255),
        address VARCHAR(80),
        phone VARCHAR(26),
        birthDate VARCHAR(80),
        web VARCHAR(550)
      );
    `);

    console.log(`Created "suppliers" table`);
    const suppliers = generateRandomSuppliers(3);

    // insert data for table "suppliers"
    const insertedProviders = await Promise.all(
      suppliers.map(async (proveedor) => {
        return client.query(
          `
          INSERT INTO suppliers (rut, name, lastName, address, phone, birthDate, web)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `,
          [
            proveedor.rut,
            proveedor.name,
            proveedor.lastName,
            proveedor.address,
            proveedor.phone,
            proveedor.birthDate,
            proveedor.web,
          ]
        );
      })
    );

    console.log(`Seeded ${insertedProviders.length} suppliers`);
    return {
      createTable,
      suppliers: insertedProviders,
    };
  } catch (error) {
    console.error("Error seeding suppliers:", error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    // create table products if not exists
    const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price VARCHAR(255) NOT NULL,
                stock VARCHAR(255) NOT NULL,
                branchOfficeId INT NOT NULL,
                FOREIGN KEY (branchOfficeId) REFERENCES sucursales(id)
            );
        `);

    console.log(`Created "products" table`);

    const products = generateRandomProducts(100);

    // insert data for table "products"
    const insertedProducts = await Promise.all(
      products.map(async (producto) => {
        return client.query(
          `
            INSERT INTO products (name, price, stock, branchOfficeId)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
          `,
          [producto.nombre, producto.precio, producto.stock, producto.sucursal]
        );
      })
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function seedProductsSold(client) {
  try {
    const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS productsSold (
        id SERIAL PRIMARY KEY,
        saleId INT NOT NULL,
        productId INT NOT NULL,
        amount INT NOT NULL,
        subtotal INT NOT NULL,
        FOREIGN KEY (saleId) REFERENCES sales(id)
    );
  `);

    console.log(`Created "products sold" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding products sold:", error);
    throw error;
  }
}

async function seedSales(client) {
  try {
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS sales (
        id SERIAL PRIMARY KEY,
        rutClient VARCHAR(20) NOT NULL,
        idSucursal INT NOT NULL,
        total INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rutClient) REFERENCES clients(rut),
        FOREIGN KEY (idSucursal) REFERENCES sucursales(id)
      );
    `);

    console.log(`Created "sales" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding sales:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedBranchOffices(client);
  // await seedClients(client);
  // await seedSuppliers(client);
  // await seedProducts(client);
  await seedSales(client);
  await seedProductsSold(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
