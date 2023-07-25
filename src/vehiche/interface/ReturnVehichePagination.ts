import { ReturnVehicleDto } from '../dtos/ReturnVehicle.dto';
import { VehicleEntity } from '../entities/vehicle.entity';

export interface ReturnVehichePagination {
  data: ReturnVehicleDto[] | VehicleEntity[];
  count: number | null;
  currentPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number | null;
}
