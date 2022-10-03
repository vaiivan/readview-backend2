import { Test, TestingModule } from '@nestjs/testing';
import { ReviewCommentsService } from './review_comments.service';

describe('ReviewCommentsService', () => {
  let service: ReviewCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewCommentsService],
    }).compile();

    service = module.get<ReviewCommentsService>(ReviewCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
