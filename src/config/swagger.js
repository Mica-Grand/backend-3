import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import __dirname from '../utils/index.js';
import 'dotenv/config'; 

const PORT = process.env.PORT||8080;


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API Documentation',
      version: '1.0.0',
      description: 'An API CRUD to manage users on the AdoptMe project',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      },
    ],
  },
  apis: [
    `${__dirname}/docs/**/*.yaml`
  ],
};

const swaggerConfig = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerConfig };