import { PartialType } from '@nestjs/mapped-types';
import { CreateTestreDto } from './create-testre.dto';

export class UpdateTestreDto extends PartialType(CreateTestreDto) {}
