import express, { Application } from 'express';
import routes from './routes';

export class Server {
  private app: Application;
  private port: number;
  private apiPrefix = '/api/v1';

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    // Enable JSON parsing before registering routes as required
    this.app.use(express.json());
  }

  private routes(): void {
    // Mount routes under prefix /api/v1 (resulting in /api/v1/products)
    this.app.use(this.apiPrefix, routes);

    // Root health-check endpoint
    this.app.get('/', (req, res) => {
      res.json({
        message: 'Products REST API is running',
        endpoints: `${this.apiPrefix}/products`,
      });
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
      console.log(`Products API available at http://localhost:${this.port}${this.apiPrefix}/products`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
