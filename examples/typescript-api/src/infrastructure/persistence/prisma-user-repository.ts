import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/user/entity';
import { IUserRepository } from '../../domain/user/repository';

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? User.reconstitute(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? User.reconstitute(row) : null;
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email.value,
        name: user.name,
        status: user.status,
      },
      update: {
        email: user.email.value,
        name: user.name,
        status: user.status,
      },
    });
  }
}
