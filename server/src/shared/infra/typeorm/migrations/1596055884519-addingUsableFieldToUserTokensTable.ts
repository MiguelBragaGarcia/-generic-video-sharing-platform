import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addingUsableFieldToUserTokensTable1596055884519
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_tokens',
      new TableColumn({
        name: 'usable',
        type: 'boolean',
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_tokens', 'usable');
  }
}
