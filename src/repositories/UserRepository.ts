import { db } from '../config/database.js';
import { logger } from '../config/logger.js';
import { CreateUserDTO } from '../DTOs/User/createUserDTO.js';
import { UpdateUserDTO } from '../DTOs/User/UpdateUserDTO.js';
import { assertUserSchema, User, UserSchema } from '../models/User.js';
import { assertNumber, assertObject } from '../utils/TypeAssertions.js';

export class UserRepository {
  static async createUser(payload: CreateUserDTO) {
    try {
      const res = await db.run(
        'insert into users (first_name, last_name, email, password, role) values ($1, $2, $3, $4, $5) returning id',
        [
          payload.firstName,
          payload.lastName,
          payload.email,
          payload.password,
          payload.role,
        ],
      );
      if (res.rowCount === 0) {
        throw new Error('Não cadastrou o usuário');
      }
      const id = res.rows[0].id;
      assertNumber(id);
      return id;
    } catch (error) {
      const stack = error instanceof Error ? error.stack : 'Unknown error';
      logger.error(`Erro ao criar novo usuário: ${stack}`);
      throw error;
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const res = await db.run('select * from users where email = $1', [email]);

      if (res.rowCount === 0) {
        throw new Error('Não existe nenhum usuário com esse email');
      }

      const user = new User(UserRepository.validateRow(res.rows[0]));

      return user;
    } catch (error) {
      const stack = error instanceof Error ? error.stack : 'Unknown error';
      logger.error(`Erro ao criar novo usuário: ${stack}`);
      throw error;
    }
  }

  static async deleteUser(id: number) {
    try {
      const res = await db.run(
        'delete * from users where id = $1 returning id',
        [id],
      );

      if (res.rowCount === 0) {
        throw new Error('Não existe usuário com o ID selecionado');
      }

      return res.rowCount;
    } catch (error) {
      const stack = error instanceof Error ? error.stack : 'Unknown error';
      logger.error(`Erro ao deletar usuário: ${stack}`);
      throw error;
    }
  }

  static async updateUser(payload: UpdateUserDTO) {
    try {
      const res = await db.run(
        `update users set 
          id = $1
          firstName = $2
          lastName = $3
          email = $4
          password = $5
          role = $6
        where id = $1 returning id`,
        [
          payload.id,
          payload.firstName,
          payload.lastName,
          payload.email,
          payload.password,
          payload.role,
        ],
      );

      if (res.rowCount === 0) {
        throw new Error('Não foi possível atualizar o usuário.');
      }

      return res.rowCount;
    } catch (error) {
      const stack = error instanceof Error ? error.stack : 'Unknown error';
      logger.error(`Erro ao atualizar usuário: ${stack}`);
      throw error;
    }
  }

  private static validateRow(data: unknown) {
    assertObject(data);

    const userLike: Record<keyof UserSchema, unknown> = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    assertUserSchema(userLike);

    return userLike;
  }
}
