/**
 * Value Objects
 *
 * 값 객체는 불변이며 자기 검증을 수행합니다.
 */

import { InvalidUserDataError } from './errors';

export class Email {
  private constructor(public readonly value: string) {}

  static create(email: string): Email {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new InvalidUserDataError(`Invalid email: ${email}`);
    }
    return new Email(normalizedEmail);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
