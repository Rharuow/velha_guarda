import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class FixAvaliableColumnName1644845562052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "meetings",
      "avalible",
      new TableColumn({
        name: "available",
        type: "boolean",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "meetings",
      "available",
      new TableColumn({
        name: "avalible",
        type: "boolean",
      })
    );
  }
}
