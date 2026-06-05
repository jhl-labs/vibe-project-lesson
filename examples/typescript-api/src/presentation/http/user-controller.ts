import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CreateUserUseCase } from '../../application/user/create-user';
import { GetUserUseCase } from '../../application/user/get-user';
import { CreateUserDto } from '../../application/user/dtos';
import { validateBody, validateParams } from '../middleware/validation';

const createUserSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().min(1).max(100),
});

const getUserParamsSchema = z.object({
  id: z.string().uuid(),
});

export class UserController {
  public router = Router();

  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {
    this.router.post('/users', validateBody(createUserSchema), this.create.bind(this));
    this.router.get('/users/:id', validateParams(getUserParamsSchema), this.getById.bind(this));
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new CreateUserDto(req.body.email, req.body.name);
      const result = await this.createUserUseCase.execute(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.getUserUseCase.execute(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
