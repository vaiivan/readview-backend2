import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword, checkPassword } from '../utilities/hash';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  // -------------------------------------------------------------------------------------------------------------------
  // create User
  // -------------------------------------------------------------------------------------------------------------------

  async createUser(createUserDto: CreateUserDto) {
    const password = await hashPassword(createUserDto.password);
    const result = await this.knex
      .returning([
        'username',
        'email',
        'id',
        'gender',
        'birthday',
        'profile_picture',
        'info',
        'level',
      ])
      .insert([
        {
          username: createUserDto.username,
          email: createUserDto.email,
          password: password,
          gender: createUserDto.gender,
          birthday: null,
        },
      ])
      .into('users');
    return result;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // insert user genre
  // -------------------------------------------------------------------------------------------------------------------

  async insertUserGenre(userId: number, likedgenres: number[]) {
    try {
      for (const likedgenre of likedgenres) {
        await this.knex('user_genre').insert({
          user_id: userId,
          genre_id: likedgenre,
        });

        await this.knex('user_genre_score').insert({
          user_id: userId,
          genre_id: likedgenre,
          score: 1,
        });
      }

      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get userinformation
  // -------------------------------------------------------------------------------------------------------------------

  //will be used in login
  async getUserByEmailAndLogin(email: string) {
    try {
      const result = await this.knex
        .select('*')
        .from('users')
        .where('email', email)
        .where('active', true);
      return result;
    } catch (e) {
      this.logger.warn(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  //find specific user
  async findUser(id: number) {
    try {
      const result = await this.knex
        .select('id', 'username', 'gender', 'profile_picture', 'info', 'level')
        .from('users')
        .where('id', id);
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  //find specific user
  async findUserWithFollowedNum(id: number) {
    try {
      const result = await this.knex.raw(
        `
        select users.id, users.username, users.gender,
        users.profile_picture, users.info, users.level, cast (count(follower_user_id) as INT) from user_user 
        full join users on user_user.to_be_followed_user_id = users.id 
        where users.id = ?
        group by users.id, users.username, users.gender, users.profile_picture, users.info, users.level `,
        [id],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // update User information
  // -------------------------------------------------------------------------------------------------------------------

  async updateUser(type: string, value: string, id: number) {
    try {
      if (type == 'username') {
        // change username
        await this.knex('users')
          .update({
            username: value,
          })
          .where('id', id);
      } else if (type == 'email') {
        // change email
        await this.knex('users')
          .update({
            email: value,
          })
          .where('id', id);
      } else if (type == 'info') {
        //change info
        await this.knex('users')
          .update({
            info: value,
          })
          .where('id', id);
      } else if (type == 'profile_picture') {
        //change profile pic
        await this.knex('users')
          .update({
            profile_picture: value,
          })
          .where('id', id);
      }

      return [{ status: 200, message: 'success', fileName: value }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  //update Password
  async updatePassword(
    value: { newPassword: string; oldPassword: string },
    id: number,
  ) {
    try {
      //check password
      const passwordOld = await this.knex('users')
        .select('password')
        .where('id', id);

      const result = await checkPassword(
        String(value.oldPassword),
        passwordOld[0].password,
      );

      if (result) {
        await this.knex('users')
          .update({
            password: await hashPassword(String(value.newPassword)),
          })
          .where('id', id);

        return [{ status: 200, message: 'success' }];
      } else {
        return [{ status: 400, message: 'incorrect password' }];
      }
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // remove user
  // -------------------------------------------------------------------------------------------------------------------

  async deactivate(id: number) {
    try {
      await this.knex('users')
        .update({
          active: false,
        })
        .where('id', id);

      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }
}
