import { CreateUserUseCase } from '../src/application/user/create-user';
import { IUserRepository } from '../src/domain/user/repository';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
    };
    useCase = new CreateUserUseCase(mockRepo);
  });

  it('should create user with valid data', async () => {
    const result = await useCase.execute({
      email: 'test@example.com',
      name: 'Test User',
    });

    expect(result.email).toBe('test@example.com');
    expect(result.name).toBe('Test User');
    expect(result.status).toBe('pending');
    expect(mockRepo.save).toHaveBeenCalledTimes(1);
  });

  it('should throw error for duplicate email', async () => {
    mockRepo.findByEmail.mockResolvedValue({} as any);

    await expect(
      useCase.execute({ email: 'test@example.com', name: 'Test' })
    ).rejects.toThrow('Email already exists');
  });

  it('should throw error for invalid email format', async () => {
    await expect(
      useCase.execute({ email: 'invalid-email', name: 'Test' })
    ).rejects.toThrow('Invalid email');
  });

  it('should lowercase email before saving', async () => {
    const result = await useCase.execute({
      email: 'Test@EXAMPLE.com',
      name: 'Test User',
    });

    expect(result.email).toBe('test@example.com');
  });
});
