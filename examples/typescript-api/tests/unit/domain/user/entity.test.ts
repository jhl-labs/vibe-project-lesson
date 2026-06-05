import { User } from '../../../../src/domain/user/entity';

describe('User Entity', () => {
  describe('create', () => {
    it('should create a user with pending status and normalized email', () => {
      const user = User.create({
        email: 'Test@Example.com',
        name: 'Test User',
      });

      expect(user.id).toBeDefined();
      expect(user.email.value).toBe('test@example.com');
      expect(user.name).toBe('Test User');
      expect(user.status).toBe('pending');
    });

    it('should throw error for invalid email', () => {
      expect(() => User.create({ email: 'bad-email', name: 'Test User' })).toThrow(
        'Invalid email'
      );
    });
  });

  describe('status transitions', () => {
    it('should activate from pending', () => {
      const user = User.create({ email: 'test@example.com', name: 'Test User' });

      user.activate();

      expect(user.status).toBe('active');
    });

    it('should not activate when not pending', () => {
      const user = User.create({ email: 'test@example.com', name: 'Test User' });
      user.activate();

      expect(() => user.activate()).toThrow('Only pending users can be activated');
    });

    it('should deactivate from active', () => {
      const user = User.create({ email: 'test@example.com', name: 'Test User' });
      user.activate();

      user.deactivate();

      expect(user.status).toBe('inactive');
    });

    it('should not deactivate when not active', () => {
      const user = User.create({ email: 'test@example.com', name: 'Test User' });

      expect(() => user.deactivate()).toThrow('Only active users can be deactivated');
    });
  });

  describe('reconstitute', () => {
    it('should restore persisted user state', () => {
      const user = User.reconstitute({
        id: 'user-1',
        email: 'restored@example.com',
        name: 'Restored',
        status: 'active',
      });

      expect(user.id).toBe('user-1');
      expect(user.email.value).toBe('restored@example.com');
      expect(user.name).toBe('Restored');
      expect(user.status).toBe('active');
    });
  });
});
