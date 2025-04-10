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
    this.app.set('frontend_url', process.env.FRONTEND_URL || '');
    this.app.set(
      'public_url',
      process.env.PUBLIC_URL || `http://localhost:${process.env.PORT}`,
    );
    this.app.set('port', process.env.PORT || 3000);

    this.app.use(
      cors({ origin: this.app.get('frontend_url'), credentials: true }),
    );
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
    // Replace the PUBLIC_URL in the Swagger document
    const publicUrl = `${this.app.get('public_url')}`;
    swaggerDoc.servers[0].url = publicUrl;

    // Serve Swagger UI
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

    console.log(
      colors.green(`API documentation available at ${publicUrl}/api-docs`),
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
