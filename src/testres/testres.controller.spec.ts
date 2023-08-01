import { Test, TestingModule } from '@nestjs/testing';
import { TestresController } from './testres.controller';
import { TestresService } from './testres.service';

describe('TestresController', () => {
  let controller: TestresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestresController],
      providers: [TestresService],
    }).compile();

    controller = module.get<TestresController>(TestresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
