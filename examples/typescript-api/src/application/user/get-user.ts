import { IUserRepository } from '../../domain/user/repository';
import { InvalidUserDataError, UserNotFoundError } from '../../domain/user/errors';
import { UserResponseDto } from './dtos';

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDto> {
    const normalizedId = id.trim();
    if (!normalizedId) {
      throw new InvalidUserDataError('User ID is required');
    }

    const user = await this.userRepository.findById(normalizedId);
    if (!user) {
      throw new UserNotFoundError(normalizedId);
    }
    return UserResponseDto.from(user);
  }
}
