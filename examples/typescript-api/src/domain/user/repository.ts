import { User } from './entity';

/**
 * User Repository Interface
 *
 * 도메인 레이어에서 정의하는 저장소 인터페이스입니다.
 * 실제 구현은 Infrastructure 레이어에서 합니다.
 */
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
