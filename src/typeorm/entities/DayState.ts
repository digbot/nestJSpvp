import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'day' }) // Define table name
export class DayState {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  date: Date;

  @Column('decimal', { precision: 6, scale: 2 })
  value: number;

  @Column()
  comment: string;

  @Column()
  note: string;

  @Column({
    type: 'enum',
    enum: ['cc', 'manuel'],
    default: 'cc', // Optional: set a default value
  })
  type: string; // Define the type as a TypeScript union,

  @Column({ type: 'varchar', length: 255 })
  @Index() // Add index decorator to create an index on the hash column
  hash: string; // New column for storing hash values
}
