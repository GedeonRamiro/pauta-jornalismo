import { ReturnPautaDto } from '../dtos/ReturnPauta.dto';
import { PautaEntity } from '../entities/pauta.entity';

export interface ReturnPautaPagination {
  data: ReturnPautaDto[] | PautaEntity[];
  count: number | null;
  currentPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number | null;
}
