/**
 * Application DTOs
 */

export class CreateUserDto {
  constructor(
    public readonly email: string,
    public readonly name: string,
  ) {}
}

export class UserResponseDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly status: string,
  ) {}

  static from(user: { id: string; email: { value: string }; name: string; status: string }) {
    return new UserResponseDto(user.id, user.email.value, user.name, user.status);
  }
}
