import dotenv from 'dotenv';
import cors from 'cors';
import express, { Application } from 'express';
import session from 'express-session';
import http, { Server as HttpServer } from 'http';

import colors from 'colors/safe';
import routes from './routes/routes';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';

dotenv.config();

class Server {
  private app: Application;

  private server: HttpServer;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.config();
    this.routes();
    this.configSwagger();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      session({
        secret: String(process.env.SESSION_KEY),
        resave: false,
        saveUninitialized: true,
      }),
    );
  }

  private configSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    console.log(
      colors.green(
        `API documentation available at http://localhost:${this.app.get(
          'port',
        )}/api-docs`,
      ),
    );
  }

  private routes(): void {
    this.app.use('/', routes);
  }

  public start(): void {
    this.server.listen(this.app.get('port'), () => {
      console.log(
        colors.green(`Server running on port ${this.app.get('port')}`),
      );
    });
  }
}

const server = new Server();
server.start();
