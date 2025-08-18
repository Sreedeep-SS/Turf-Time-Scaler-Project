// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Turf Time API",
      version: "1.0.0",
      description: "API documentation for Turf Time application",
    },
    servers: [
      {
        url: "http://localhost:5003/api", // adjust port/path
      },
    ],
  },
  // Paths to files where API docs live
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
