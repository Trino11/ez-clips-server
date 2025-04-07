import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Ez Clips API',
    description: 'API documentation for Ez Clips',
    version: process.env.npm_package_version,
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/index.ts']; // Cambia este archivo según el punto de entrada de tu API

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // require('./dist/index'); // Inicia el servidor automáticamente
});
