/**
 * User Entity
 *
 * 사용자 도메인 엔터티입니다.
 * 비즈니스 규칙과 불변성을 캡슐화합니다.
 */

import { Email } from './value-objects';

export class User {
  private constructor(
    public readonly id: string,
    public readonly email: Email,
    public readonly name: string,
    private _status: 'pending' | 'active' | 'inactive'
  ) {}

  static create(data: { email: string; name: string }): User {
    const email = Email.create(data.email);
    return new User(
      crypto.randomUUID(),
      email,
      data.name,
      'pending'
    );
  }

  static reconstitute(data: {
    id: string; email: string; name: string; status: string
  }): User {
    return new User(
      data.id,
      Email.create(data.email),
      data.name,
      data.status as 'pending' | 'active' | 'inactive'
    );
  }

  get status() { return this._status; }

  activate(): void {
    if (this._status !== 'pending') {
      throw new Error('Only pending users can be activated');
    }
    this._status = 'active';
  }

  deactivate(): void {
    if (this._status !== 'active') {
      throw new Error('Only active users can be deactivated');
    }
    this._status = 'inactive';
  }
}
