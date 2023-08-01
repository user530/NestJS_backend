import { Injectable } from '@nestjs/common';
import { CreateTestreDto } from './dto/create-testre.dto';
import { UpdateTestreDto } from './dto/update-testre.dto';

@Injectable()
export class TestresService {
  create(createTestreDto: CreateTestreDto) {
    return 'This action adds a new testre';
  }

  findAll() {
    return `This action returns all testres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testre`;
  }

  update(id: number, updateTestreDto: UpdateTestreDto) {
    return `This action updates a #${id} testre`;
  }

  remove(id: number) {
    return `This action removes a #${id} testre`;
  }
}
