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

interface Quotes {
    id: number,
    text: string,
}

interface Booklist {
    text: string,
}

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {
  // // get the raw data
  // // convert xlsx into infos
  // const quotes = (await workbookToJSON(
  //   './data/quotes_cleansed.xlsx',
  //   'quotes_cleansed',
  // )) as Quotes[];
  // const QuoteNumbers = 71434;
  // const insertingTimes = 9;

  // //start
  // //for Loop
  // for (let i = 0; i < insertingTimes; i++) {
  //   for (const quote of quotes) {
  //     let content = quote.text
  //       logger.log(`start inserting ${(quote.id + (i * 8310))}`);
  //       await knex('book_quote')
  //         .update({
  //           content: content,
  //         })
  //         .where('id', (quote.id + (i * 8310)));
  //   }
  // }

  // // convert xlsx into infos
  // const booklistNames = (await workbookToJSON(
  //   './data/booklist.xlsx',
  //   'booklist',
  // )) as Booklist[];

  // //start
  // //for Loop
  // let i = 1
  //   for (const booklistName of booklistNames) {
  //       logger.log(`start inserting ${(i)}`);
  //       console.log(booklistName.text)
  //       await knex('booklist')
  //         .update({
  //           title: booklistName.text,
  //         })
  //         .where('id', i);
  //         i++
  //   }

  // logger.log('inserted all quotes and booklistnames');
}
