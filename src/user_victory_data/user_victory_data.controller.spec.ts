import { Test, TestingModule } from '@nestjs/testing';
import { UserVictoryDataController } from './user_victory_data.controller';
import { UserVictoryDataService } from './user_victory_data.service';

describe('UserVictoryDataController', () => {
  let controller: UserVictoryDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVictoryDataController],
      providers: [UserVictoryDataService],
    }).compile();

    controller = module.get<UserVictoryDataController>(UserVictoryDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
