import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeet1641139143887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "meetings",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "start_at", type: "timestamp" },
          { name: "location", type: "varchar" },
          { name: "amount_chars", type: "smallint" },
          { name: "hours", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "event_id", type: "uuid" },
        ],
        foreignKeys: [
          {
            name: "FKEventsChars",
            columnNames: ["event_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "events",
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("meetings");
  }
}
