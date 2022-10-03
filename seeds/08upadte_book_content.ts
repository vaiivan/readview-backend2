import { Logger } from '@nestjs/common';
import { Chance } from 'chance';
import { Knex } from 'knex';
import moment from 'moment';
import { workbookToJSON } from '../src/utilities/xlsx';

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - xlsx_info');
moment().format();

interface Info {
  no: number;
  summary: string;
}

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {
  // // convert xlsx into infos
  // const infos = (await workbookToJSON(
  //   './data/summary2_cleansed.xlsx',
  //   'summary2_cleansed',
  // )) as Info[];

  // const bookNumber = 28564;
  // const inserting = 47
  // //start
  // //for Loop
  // for (let i = 1; i < inserting; i++) {
  //   for (const info of infos) {
  //     logger.log(`start inserting ${info.no}`);
  //     await knex('book')
  //       .update({
  //         info: info.summary,
  //       })
  //       .where('id', (info.no + (620 * i)+ 1));
  //   }
  //   logger.log('inserted 620 infos');
  // }

  // logger.log('updated all book infos');
}
