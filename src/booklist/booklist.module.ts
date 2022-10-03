import { Module } from '@nestjs/common';
import { BooklistService } from './booklist.service';
import { BooklistController } from './booklist.controller';

@Module({
  controllers: [BooklistController],
  providers: [BooklistService]
})
export class BooklistModule {}
