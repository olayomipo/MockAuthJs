const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Backend API',
      version: '1.0.0',
      description: 'API documentation for your Node.js backend',
      contact: {
        name: 'Your Name',
        url: 'https://your-website.com',
        email: 'your-email@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8304',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }] // Apply to all endpoints requiring auth
  },
  apis: ['./src/routes/*.js'], // Include route files
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Redirect '/' to '/docs'
  app.get('/', (req, res) => {
    res.redirect('/docs');
  });
};

module.exports = setupSwagger;
