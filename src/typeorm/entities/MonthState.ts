import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'month' }) // Define table name
export class MonthState {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  date: Date;

  @Column()
  in: number;

  @Column()
  out: number;

  @Column({ nullable: true })
  buffer: number;

  // Add other columns as needed
}
