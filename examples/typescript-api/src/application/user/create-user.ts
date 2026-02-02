import { User } from '../../domain/user/entity';
import { IUserRepository } from '../../domain/user/repository';
import { CreateUserDto, UserResponseDto } from './dtos';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    // 1. 비즈니스 검증: 이메일 중복 확인
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    // 2. 도메인 엔터티 생성 (값 객체 검증 포함)
    const user = User.create({ email: dto.email, name: dto.name });

    // 3. 영속화
    await this.userRepository.save(user);

    // 4. 응답 DTO 변환
    return UserResponseDto.from(user);
  }
}
