import { Test, TestingModule } from '@nestjs/testing';
import { SpecialListService } from './special-list.service';

describe('SpecialListService', () => {
  let service: SpecialListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialListService],
    }).compile();

    service = module.get<SpecialListService>(SpecialListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
