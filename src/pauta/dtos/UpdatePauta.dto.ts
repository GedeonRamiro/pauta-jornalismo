import { IsDate, IsOptional } from 'class-validator';
import { CreatePautaDto } from './CreatePauta.dto';

export class UpdatePautaDto extends CreatePautaDto {
  @IsOptional()
  @IsDate()
  updateAt: Date;
}
