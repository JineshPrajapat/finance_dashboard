import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_sessions')
export class UserSession extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  us_id: number;

  @Column({ type: 'int' })
  u_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'u_id' })
  user: User;

  @Column({ type: 'text', nullable: false })
  refresh_token: string;

  @Column({ type: 'timestamp', nullable: false })
  expires_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
