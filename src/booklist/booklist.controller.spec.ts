import { Test, TestingModule } from '@nestjs/testing';
import { BooklistController } from './booklist.controller';
import { BooklistService } from './booklist.service';

describe('BooklistController', () => {
  let controller: BooklistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooklistController],
      providers: [BooklistService],
    }).compile();

    controller = module.get<BooklistController>(BooklistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
