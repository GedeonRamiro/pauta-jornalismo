import { PautaEntity } from 'src/pauta/entities/pauta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'vehicle' })
export class VehicleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'model', nullable: false })
  model: string;

  @Column({ name: 'manufacturer', nullable: false })
  manufacturer: string;

  @Column({ name: 'plate', nullable: false, unique: true })
  plate: string;

  @Column({ name: 'color', nullable: false })
  color: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @OneToMany(() => PautaEntity, (pauta) => pauta.vehicle)
  pauta?: PautaEntity[];
}
