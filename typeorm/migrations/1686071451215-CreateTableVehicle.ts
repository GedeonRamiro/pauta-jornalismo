import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVehicle1686071451215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },
          {
            name: 'model',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'manufacturer',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'plate',
            type: 'varchar',
            length: '45',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'color',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('camera');
  }
}
