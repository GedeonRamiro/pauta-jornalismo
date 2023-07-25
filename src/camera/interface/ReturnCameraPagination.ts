import { ReturnCameraDto } from '../dtos/ReturnCamera.dto';
import { CameraEntity } from '../entities/camera.entity';

export interface ReturnCameraPagination {
  data: ReturnCameraDto[] | CameraEntity[];
  count: number | null;
  currentPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number | null;
}
