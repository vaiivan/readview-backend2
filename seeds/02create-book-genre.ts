import { Logger } from "@nestjs/common";
import { Knex } from "knex";

const logger = new Logger('seed file - genre')

export async function seed(knex: Knex): Promise<void> {

    // //delete all existing data
    // await knex("genre").del();

    // // Inserts seed entries
    // await knex("genre").insert([
    //     {genre_name:'Action', fiction_type:'fiction'},
    //     {genre_name:'Adventure', fiction_type:'fiction'},
    //     {genre_name:'Animal', fiction_type:'nonfiction'},
    //     {genre_name:`Anthology`, fiction_type:'nonfiction'},
    //     {genre_name:'Arts', fiction_type:'nonfiction'},
    //     {genre_name:'Autobiography', fiction_type:'nonfiction'},
    //     {genre_name:'Biographical', fiction_type:'nonfiction'},
    //     {genre_name:'Biography', fiction_type:'nonfiction'},
    //     {genre_name:'Book tie-in', fiction_type:'nonfiction'},
    //     {genre_name:'Education & Teaching', fiction_type:'nonfiction'},
    //     {genre_name:'Engineering & Transportation', fiction_type:'nonfiction'},
    //     {genre_name:'Health, Fitness & Dieting', fiction_type:'nonfiction'},
    //     {genre_name:'Christian', fiction_type:'nonfiction'},
    //     {genre_name:'Cinematization', fiction_type:'nonfiction'},
    //     {genre_name:'Classic', fiction_type:'fiction'},
    //     {genre_name:'Collection', fiction_type:'nonfiction'},
    //     {genre_name:'Coming of age', fiction_type:'nonfiction'},
    //     {genre_name:'Crime', fiction_type:'fiction'},
    //     {genre_name:'Domestic', fiction_type:'nonfiction'},
    //     {genre_name:'Dystopia', fiction_type:'fiction'},
    //     {genre_name:'Epic', fiction_type:'nonfiction'},
    //     {genre_name:'Erotic', fiction_type:'fiction'},
    //     {genre_name:'Family', fiction_type:'nonfiction'},
    //     {genre_name:'Fantasy', fiction_type:'fiction'},
    //     {genre_name:'Fiction', fiction_type:'fiction'},
    //     {genre_name:'Graphic novel', fiction_type:'fiction'},
    //     {genre_name:'Health', fiction_type:'nonfiction'},
    //     {genre_name:'Mind and Body', fiction_type:'nonfiction'},
    //     {genre_name:'Historical', fiction_type:'fiction'},
    //     {genre_name:'History', fiction_type:'nonfiction'},
    //     {genre_name:'Horror', fiction_type:'fiction'},
    //     {genre_name:'Humor', fiction_type:'fiction'},
    //     {genre_name:'Inspirational', fiction_type:'nonfiction'},
    //     {genre_name:'Juvenile', fiction_type:'nonfiction'},
    //     {genre_name:'Legal', fiction_type:'nonfiction'},
    //     {genre_name:'Literary', fiction_type:'nonfiction'},
    //     {genre_name:'Love story', fiction_type:'fiction'},
    //     {genre_name:'Medical', fiction_type:'nonfiction'},
    //     {genre_name:'Memoir', fiction_type:'nonfiction'},
    //     {genre_name:'Mystery', fiction_type:'fiction'},
    //     {genre_name:'Noir', fiction_type:'fiction'},
    //     {genre_name:'NonFiction', fiction_type:'nonfiction'},
    //     {genre_name:'Political', fiction_type:'nonfiction'},
    //     {genre_name:'Psychological', fiction_type:'nonfiction'},
    //     {genre_name:'Psychology', fiction_type:'nonfiction'},
    //     {genre_name:'Religion', fiction_type:'nonfiction'},
    //     {genre_name:'Religious', fiction_type:'nonfiction'},
    //     {genre_name:'Romance', fiction_type:'fiction'},
    //     {genre_name:'Saga', fiction_type:'nonfiction'},
    //     {genre_name:'Satire', fiction_type:'nonfiction'},
    //     {genre_name:'Science', fiction_type:'nonfiction'},
    //     {genre_name:'Science fiction', fiction_type:'fiction'},
    //     {genre_name:'Sociological', fiction_type:'nonfiction'},
    //     {genre_name:'Sociology', fiction_type:'nonfiction'},
    //     {genre_name:'Southern fiction', fiction_type:'fiction'},
    //     {genre_name:'Sports', fiction_type:'nonfiction'},
    //     {genre_name:'Spy', fiction_type:'fiction'},
    //     {genre_name:'Suspense', fiction_type:'nonfiction'},
    //     {genre_name:'Thriller', fiction_type:'fiction'},
    //     {genre_name:'War', fiction_type:'nonfiction'},
    //     {genre_name:'Western', fiction_type:'nonfiction'},
    //     {genre_name:'Young adult', fiction_type:'nonfiction'},
    //     {genre_name:'Young adult fiction', fiction_type:'fiction'},
    //     {genre_name:'American History', fiction_type:'nonfiction'},
    // ]);

    // logger.log('inserted genre')
};
