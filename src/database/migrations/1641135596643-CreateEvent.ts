import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEvent1641135596643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "events",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "varchar", isUnique: true },
          { name: "cooldown", type: "smallint" },
          { name: "lvl_min", type: "smallint", default: 0 },
          { name: "lvl_max", type: "smallint", default: 1000000 },
          { name: "max_chars", type: "smallint", default: 1000000 },
          { name: "min_chars", type: "smallint", default: 0 },
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
          { name: "user_id", type: "uuid" },
        ],
        foreignKeys: [
          {
            name: "FKUser",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
  }
}
