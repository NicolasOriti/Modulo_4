const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';
    this.categoriesPath = '/api/categories';

    // DB
    this.connection();

    // middlewares
    this.middlewares();

    // routes
    this.routes();
  }

  async connection() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('tiny'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users.routes'));
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.categoriesPath, require('../routes/categories.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is online on: http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
