import { IUserRepository } from '../../domain/user/repository';
import { UserResponseDto } from './dtos';

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User not found: ${id}`);
    }
    return UserResponseDto.from(user);
  }
}
