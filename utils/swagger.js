const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'Your API description'
        },
        servers: [
            {
                url:process.env.NODE_ENV==='development' ?'http://localhost:8000':"https://e-learning-express-server.vercel.app", // Replace with your server URL
            },
        ],
    },
   
    apis: ['./../Routes/*.js'], // Path to the API docs
};

 module.exports.swaggerDocs = swaggerJsDoc(swaggerOptions);
