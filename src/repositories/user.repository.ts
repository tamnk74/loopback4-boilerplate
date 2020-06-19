import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<User | undefined> {
    try {
      return await this.findById(userId);
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
