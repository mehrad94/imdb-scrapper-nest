import { Test, TestingModule } from '@nestjs/testing';
import { SpecialListController } from './special-list.controller';

describe('SpecialListController', () => {
  let controller: SpecialListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialListController],
    }).compile();

    controller = module.get<SpecialListController>(SpecialListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
