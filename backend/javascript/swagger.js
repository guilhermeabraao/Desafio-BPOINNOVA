const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointFiles = ['./router.js'];

swaggerAutogen(outputFile, endpointFiles);