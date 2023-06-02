import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUser1685641380465 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            name: 'name',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '123',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '45',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'type_user',
            type: 'int',
            default: '1',
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
    await queryRunner.dropTable('user');
  }
}
