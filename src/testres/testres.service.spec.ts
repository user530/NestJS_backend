import { Test, TestingModule } from '@nestjs/testing';
import { TestresService } from './testres.service';

describe('TestresService', () => {
  let service: TestresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestresService],
    }).compile();

    service = module.get<TestresService>(TestresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
