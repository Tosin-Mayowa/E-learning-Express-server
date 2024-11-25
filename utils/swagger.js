const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Globaltech E-Learning Apis',
            version: '1.0.0',
            description: 'Api for LMS app'
        },
        servers: [
            {
                url:process.env.NODE_ENV==='development' ?'http://localhost:8000':'https://e-learning-express-server.onrender.com', // Replace with your server URL
            },
        ],
    },
   
    apis: ['./Routes/*.js'], // Path to the API docs ['./../Routes/*.js']
};

 module.exports.swaggerDocs = swaggerJsDoc(swaggerOptions);
