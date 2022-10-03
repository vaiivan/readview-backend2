import { Test, TestingModule } from '@nestjs/testing';
import { UserVictoryDataService } from './user_victory_data.service';

describe('UserVictoryDataService', () => {
  let service: UserVictoryDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVictoryDataService],
    }).compile();

    service = module.get<UserVictoryDataService>(UserVictoryDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
