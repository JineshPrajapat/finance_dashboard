import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum RecordType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('financial_records')
export class FinancialRecord extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  fr_id: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  @Index()
  amount: number;

  @Column({ type: 'enum', enum: RecordType })
  @Index()
  type: RecordType;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  category: string;

  @Column({ type: 'date' })
  @Index()
  date: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // audit
  @Column({ type: 'int', nullable: true })
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
