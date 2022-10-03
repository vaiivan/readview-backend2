import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { KnexModule } from 'nestjs-knex';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { BookModule } from './book/book.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewCommentsModule } from './review_comments/review_comments.module';
import { BooklistModule } from './booklist/booklist.module';
import { DiscussionModule } from './discussion/discussion.module';
import { UserInteractionModule } from './user_interaction/user_interaction.module';
import { UserVictoryDataModule } from './user_victory_data/user_victory_data.module';
import { AuthorModule } from './author/author.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    UserModule,
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: "postgresql",
          useNullAsDefault: true,
          connection: {
            host: process.env.DB_HOST || "localhost",
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
          },
        },
      }),
    }),
    AuthModule,
    SearchModule,
    BookModule,
    ReviewsModule,
    ReviewCommentsModule,
    BooklistModule,
    DiscussionModule,
    UserInteractionModule,
    UserVictoryDataModule,
    AuthorModule,
  ],
})
export class AppModule {}

