import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class maintbl1714308718546 implements MigrationInterface {
  tableName: string;
  constructor() {
    this.tableName = 'month';
  }

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'in',
            type: 'int',
          },
          {
            name: 'out',
            type: 'int',
          },
          {
            name: 'bufer',
            type: 'int',
          },
          {
            name: 'invest',
            type: 'int',
          },
          {
            name: 'date',
            type: 'datetime',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable(this.tableName);
    await queryRunner.dropTable(this.tableName);
  }
}
