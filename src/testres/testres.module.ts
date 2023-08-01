import { Module } from '@nestjs/common';
import { TestresService } from './testres.service';
import { TestresController } from './testres.controller';

@Module({
  controllers: [TestresController],
  providers: [TestresService]
})
export class TestresModule {}
