import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeet1641139143887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "meetings",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "start_at", type: "timestamp without time zone" },
          {
            name: "finished_at",
            type: "timestamp without time zone",
            isNullable: true,
          },
          { name: "location", type: "varchar" },
          { name: "avalible", type: "boolean", default: true },
          {
            name: "created_at",
            type: "timestamp without time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp without time zone",
            default: "now()",
          },
          { name: "event_id", type: "uuid" },
        ],
        foreignKeys: [
          {
            name: "FKEventsChars",
            columnNames: ["event_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "events",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("chars_meetings_meetings", true);
    await queryRunner.dropTable("meetings");
  }
}
