import { Logger } from '@nestjs/common';
import Chance from 'chance';
import { Knex } from 'knex';
import moment from 'moment';
import jsonfile from 'jsonfile';

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - fake_infos');
moment().format();

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------
export async function seed(knex: Knex): Promise<void> {
    // get the raw data
    const books = await jsonfile.readFile('./data/review2.json');
    const insertingTimes = 4;
    
    //start
    //for Loop
    for (let i = 0; i < 4; i++){
        let x = 1;
        for (const book of books) {
        let reviews = book.reviews;
        for (const review of reviews) {
          logger.log(`start inserting ${x + (i * 1084)}`);
          await knex('discussion')
            .update({
              info: review,
            })
            .where('id', x + (i* 1084));
          x++
        }
      }
    }

    for (let i = 0; i < 58; i++){
        let x = 1;
        for (const book of books) {
        let reviews = book.reviews;
        for (const review of reviews) {
          logger.log(`start inserting ${x + (i * 1084)}`);
          await knex('discussion_comment')
            .update({
              content: review,
            })
            .where('id', x + (i* 1084));
          x++
        }
      }
    }
      
    logger.log('inserted all infos');
};
