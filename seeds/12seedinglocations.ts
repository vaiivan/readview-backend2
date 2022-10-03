import { Logger } from '@nestjs/common';
import Chance from 'chance';
import { Knex } from 'knex';
import moment from 'moment';

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - location');
moment().format();

const locations=[
    'Hong Kong',
    'Taiwan',
    'Japan',
    'United Kingdom',
    'US',
    'Australia',
    'Europe',
    'Korea',
    'England',
    'Thai',
    'Singapore',
    'Canada',
    'China',
    'Russia',
    'New Zealand',
]

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {
  // const users = 1041;
  // await knex.raw(`
  // delete from users where id > 1041
  // `)
  // for (let i = 1; i < 1042; i++) {
  //   logger.log(`start inserting ${i}`);
  //   const locationChance = chance.integer({min: 0, max: 14})
  //   await knex('users').update({
  //       location: locations[locationChance]
  //   }).where('id', i)
  // }

  // logger.log('inserted all locations');
}
