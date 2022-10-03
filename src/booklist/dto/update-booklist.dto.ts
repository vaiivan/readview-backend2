import { PartialType } from '@nestjs/mapped-types';
import { CreateBooklistDto } from './create-booklist.dto';

export class UpdateBooklistDto extends PartialType(CreateBooklistDto) {
    title: string;
    privateStatus: boolean;
}
