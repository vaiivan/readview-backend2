import { Logger } from '@nestjs/common';
import Chance from 'chance';
import { Knex } from 'knex';
import moment from 'moment';
import { hashPassword } from '../src/utilities/hash';

const chance = new Chance();
const logger = new Logger('seed file - users');
const times = 1000;
moment().format();

export async function seed(knex: Knex): Promise<void> {
  // try {
  //   await knex.transaction(async (trx) => {
  //     // Deletes ALL existing entries
  //     await knex('users').del().transacting(trx);

  //     //insert debugging account
  //     await knex('users')
  //         .insert([
  //           {
  //             username: 'Nomore bugs',
  //             email: 'bugsno@gmail.com',
  //             password: await hashPassword('123'),
  //             gender: 'you guess?',
  //             birthday: '2047/2/28',
  //           },
  //         ])
  //         .transacting(trx);

  //     // Inserts seed entries
  //     for (let i = 0; i < times; i++) {
  //       await knex('users')
  //         .insert([
  //           {
  //             username: chance.name({ nationality: 'en' }),
  //             email: chance.email({ domain: 'gmail.com' }),
  //             password: await hashPassword('123'),
  //             gender: chance.gender(),
  //             birthday: moment(
  //               chance.birthday({ string: true, american: false }),
  //               'DD/MM/YYYY',
  //             ).format('YYYY/MM/DD'),
  //           },
  //         ])
  //         .transacting(trx);
  //     }
  //   });

  //   logger.log(`inserted ${times} fake-user-data`);
  // } catch (e) {
  //   logger.error(e);
  // }
}
