import { Router, Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/user/create-user';
import { GetUserUseCase } from '../../application/user/get-user';
import { CreateUserDto } from '../../application/user/dtos';

export class UserController {
  public router = Router();

  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {
    this.router.post('/users', this.create.bind(this));
    this.router.get('/users/:id', this.getById.bind(this));
  }

  private async create(req: Request, res: Response) {
    try {
      const dto = new CreateUserDto(req.body.email, req.body.name);
      const result = await this.createUserUseCase.execute(dto);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  private async getById(req: Request, res: Response) {
    try {
      const result = await this.getUserUseCase.execute(req.params.id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }
    }
  }
}
