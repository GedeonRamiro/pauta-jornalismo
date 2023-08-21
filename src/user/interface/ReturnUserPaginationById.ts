import { ReturnUserDto } from '../dtos/ReturnUser.dto';
import { UserEntity } from '../entities/user.entity';

export interface ReturnUserPaginationById {
  data: ReturnUserDto | UserEntity;
  count: number | null;
  currentPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number | null;
}
