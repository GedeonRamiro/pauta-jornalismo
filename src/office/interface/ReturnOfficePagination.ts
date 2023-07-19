import { ReturnOfficeDto } from '../dtos/ReturnOffice.dto';
import { OfficeEntity } from '../entities/office.entity';

export interface ReturnOfficePagination {
  data: ReturnOfficeDto[] | OfficeEntity[];
  count: number | null;
  currentPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number | null;
}
