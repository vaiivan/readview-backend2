import { Module } from '@nestjs/common';
import { UserVictoryDataService } from './user_victory_data.service';
import { UserVictoryDataController } from './user_victory_data.controller';

@Module({
  controllers: [UserVictoryDataController],
  providers: [UserVictoryDataService]
})
export class UserVictoryDataModule {}
