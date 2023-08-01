import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestresService } from './testres.service';
import { CreateTestreDto } from './dto/create-testre.dto';
import { UpdateTestreDto } from './dto/update-testre.dto';

@Controller('testres')
export class TestresController {
  constructor(private readonly testresService: TestresService) {}

  @Post()
  create(@Body() createTestreDto: CreateTestreDto) {
    return this.testresService.create(createTestreDto);
  }

  @Get()
  findAll() {
    return this.testresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestreDto: UpdateTestreDto) {
    return this.testresService.update(+id, updateTestreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testresService.remove(+id);
  }
}
