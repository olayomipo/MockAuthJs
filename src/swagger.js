const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      "title": "MockAuthJs API",
      "version": "1.0.0",
      "description": "MockAuthJs is a Node.js backend API featuring JWT-based authentication and integrated Swagger documentation.",
      "contact": {
        "name": "Your Name",
        "url": "https://your-website.com",
        "email": "your-email@example.com"
      }
    },
    servers: [
      {
        "description": ""
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
