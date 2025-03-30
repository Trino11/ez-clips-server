import dotenv from 'dotenv';
import cors from 'cors';
import express, { Application } from 'express';
import session from 'express-session';
import http, { Server as HttpServer } from 'http';

import colors from 'colors/safe';
import routes from './routes/routes';

dotenv.config();

class Server {
  private app: Application;

  private server: HttpServer;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.config();
    this.routes();
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
