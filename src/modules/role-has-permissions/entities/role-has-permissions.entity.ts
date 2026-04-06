import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('role_has_permissions')
@Unique(['r_id', 'p_id'])
export class RoleHasPermissions extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  rhp_id: number;

  @Column({ type: 'int' })
  r_id: number;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'r_id' })
  role: Role;

  @Column({ type: 'int' })
  p_id: number;

  @ManyToOne(() => Permission, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'p_id' })
  permission: Permission;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
