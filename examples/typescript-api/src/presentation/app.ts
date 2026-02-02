import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { UserController } from './http/user-controller';
import { CreateUserUseCase } from '../application/user/create-user';
import { GetUserUseCase } from '../application/user/get-user';
import { PrismaUserRepository } from '../infrastructure/persistence/prisma-user-repository';
import { prisma } from '../infrastructure/database/prisma';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';

export const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Dependency injection & Routes
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, getUserUseCase);

app.use('/api', userController.router);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
});

// Error handler
app.use(errorHandler);
