import { PautaEntity } from 'src/pauta/entities/pauta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'camera' })
export class CameraEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'identifier_number', nullable: false, unique: true })
  identifierNumber: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @OneToMany(() => PautaEntity, (pauta) => pauta.camera)
  pauta?: PautaEntity[];
}
