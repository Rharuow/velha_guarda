import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuest1641053503244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "quest",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "lvl_required",
            type: "smallint",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("quest");
  }
}
