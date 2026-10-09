import dotenv from 'dotenv';
import { Server } from './server';

// Load environment variables
dotenv.config();

// Initialize and start server
const server = new Server();
server.listen();
