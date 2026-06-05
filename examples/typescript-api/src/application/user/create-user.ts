import { User } from '../../domain/user/entity';
import { IUserRepository } from '../../domain/user/repository';
import {
  InvalidUserDataError,
  UserAlreadyExistsError,
} from '../../domain/user/errors';
import { CreateUserDto, UserResponseDto } from './dtos';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const normalizedName = dto.name.trim();
    if (!normalizedName) {
      throw new InvalidUserDataError('Name is required');
    }

    // 1. 비즈니스 검증: 이메일 중복 확인
    const existing = await this.userRepository.findByEmail(normalizedEmail);
    if (existing) {
      throw new UserAlreadyExistsError(normalizedEmail);
    }

    // 2. 도메인 엔터티 생성 (값 객체 검증 포함)
    const user = User.create({ email: normalizedEmail, name: normalizedName });

    // 3. 영속화
    await this.userRepository.save(user);

    // 4. 응답 DTO 변환
    return UserResponseDto.from(user);
  }
}
