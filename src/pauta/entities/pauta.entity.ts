import { CameraEntity } from 'src/camera/entities/camera.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { VehicleEntity } from 'src/vehiche/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pauta' })
export class PautaEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'camera_id', nullable: false })
  cameraId: string;

  @Column({ name: 'vehicle_id', nullable: false })
  vehicleId: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'information', nullable: false })
  information: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.pauta)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToOne(() => CameraEntity, (camera) => camera.pauta)
  @JoinColumn({ name: 'camera_id', referencedColumnName: 'id' })
  camera?: CameraEntity;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.pauta)
  @JoinColumn({ name: 'vehicle_id', referencedColumnName: 'id' })
  vehicle?: VehicleEntity;
}
