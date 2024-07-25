import { PartialType } from '@nestjs/swagger';
import { CreateGeneratePdfDto } from './create-generate-pdf.dto';

export class UpdateGeneratePdfDto extends PartialType(CreateGeneratePdfDto) {}
