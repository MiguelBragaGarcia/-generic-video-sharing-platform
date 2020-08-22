import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddThumbnailFieldToVideosTable1598097058993
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'videos',
      new TableColumn({
        name: 'thumbnail',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('videos', 'thumbnail');
  }
}
