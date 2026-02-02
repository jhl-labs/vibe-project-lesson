/**
 * Value Objects
 *
 * 값 객체는 불변이며 자기 검증을 수행합니다.
 */

export class Email {
  private constructor(public readonly value: string) {}

  static create(email: string): Email {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error(`Invalid email: ${email}`);
    }
    return new Email(email.toLowerCase());
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
