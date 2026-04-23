const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer API",
      version: "1.0.0",
      description: "Customer Management REST API",
    },
    servers: [{ url: "http://localhost:3000" }],
    tags: [
      {
        name: "Customers",
        description: "Customer management APIs",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);