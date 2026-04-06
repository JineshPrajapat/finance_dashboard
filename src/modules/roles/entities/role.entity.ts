import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RoleStatus {
  Enable = 'Enable',
  Disable = 'Disable',
}

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  r_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'enum', enum: RoleStatus, default: RoleStatus.Enable })
  status: RoleStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
