import { User } from './entities/user.entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
