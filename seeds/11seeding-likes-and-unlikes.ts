import { Logger } from '@nestjs/common';
import Chance from 'chance';
import { Knex } from 'knex';
import moment from 'moment';
import { workbookToJSON } from '../src/utilities/xlsx';

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - haha');
moment().format();

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {
  // const likeNumbers = 103001;
  // //   const insertingTimes = 9;

  // //start
  // //for Loop
  // for (let i = 1; i < likeNumbers; i++) {
  //   logger.log(`start inserting ${i}`);
  //   const likelihood = chance.bool({ likelihood: 70 });
  //   if (likelihood) {
  //     await knex('user_discussion')
  //       .update({
  //         like: true,
  //         unlike: false
  //       })
  //       .where('id', i);
        
  //   } else {
  //       await knex('user_discussion')
  //       .update({
  //         like: false,
  //         unlike: true
  //       })
  //       .where('id', i);
  //   }
  // }

  // logger.log('inserted all likes and unlikes');
}
