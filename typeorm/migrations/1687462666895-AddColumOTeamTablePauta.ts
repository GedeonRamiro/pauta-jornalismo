import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumOTeamTablePauta1687462666895
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pauta',
      new TableColumn({
        name: 'team',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pauta', 'team');
  }
}
