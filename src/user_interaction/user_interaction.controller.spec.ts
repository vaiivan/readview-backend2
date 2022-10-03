import { Test, TestingModule } from '@nestjs/testing';
import { UserInteractionController } from './user_interaction.controller';
import { UserInteractionService } from './user_interaction.service';

describe('UserInteractionController', () => {
  let controller: UserInteractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInteractionController],
      providers: [UserInteractionService],
    }).compile();

    controller = module.get<UserInteractionController>(UserInteractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
