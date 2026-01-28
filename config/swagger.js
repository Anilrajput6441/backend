import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini CRM Backend API',
      version: '1.0.0',
      description: 'Backend API for Users, Customers, and Tasks'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8081}/api`,
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },

  
  apis: [
    path.join(__dirname, '../routes/*.js')
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log('Swagger paths:', swaggerSpec.paths);
export default swaggerSpec;
