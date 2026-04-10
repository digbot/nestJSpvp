import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity({ name: 'month' }) // Define table name
export class MonthState {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  date: Date;

  @Column()
  in: number;

  @Column({ nullable: true })
  in_bgn: number | null;

  @Column()
  out: number;

  @Column({ nullable: true })
  out_bgn: number | null;

  @Column({ nullable: true })
  buffer: number | null;

  @Column({ nullable: true })
  buffer_bgn: number | null;

  @Column()
  invest: number;

  @Column({ nullable: true })
  invest_bgn: number | null;

  @Expose()
  get diff(): number {
    return this.in - this.out;
  }
}
