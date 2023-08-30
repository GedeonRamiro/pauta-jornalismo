import { OfficeEntity } from '../../office/entities/office.entity';
import { PautaEntity } from '../../pauta/entities/pauta.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'office_id', nullable: true })
  office_id: string;

  @Column({ name: 'type_user' })
  typeUser: number;

  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  count?: number;

  @ManyToOne(() => OfficeEntity, (office) => office.user)
  @JoinColumn({ name: 'office_id', referencedColumnName: 'id' })
  office?: OfficeEntity;

  @OneToMany(() => PautaEntity, (pauta) => pauta.user)
  pauta?: PautaEntity[];
}
