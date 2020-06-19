import { Entity, model, property } from '@loopback/repository';

@model({
  name: 'users',
  settings: {
    hiddenProperties: ['password']
  },
  jsonSchema: {
    unqiue: ['email'],
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    id: true,
    index: true,
    required: true,
    jsonSchema: {
      maxLength: 255,
    }
  })
  name: string;

  @property({
    name: 'email',
    type: 'string',
    required: true,
    jsonSchema: {
      index: {
        unique: true,
      },
      format: 'email',
    },
    id: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
  })
  password?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
