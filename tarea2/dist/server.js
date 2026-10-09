"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
class Server {
    app;
    port;
    apiPrefix = '/api/v1';
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 3000;
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // Enable JSON parsing before registering routes as required
        this.app.use(express_1.default.json());
    }
    routes() {
        // Mount routes under prefix /api/v1 (resulting in /api/v1/products)
        this.app.use(this.apiPrefix, routes_1.default);
        // Root health-check endpoint
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Products REST API is running',
                endpoints: `${this.apiPrefix}/products`,
            });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
            console.log(`Products API available at http://localhost:${this.port}${this.apiPrefix}/products`);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.Server = Server;
