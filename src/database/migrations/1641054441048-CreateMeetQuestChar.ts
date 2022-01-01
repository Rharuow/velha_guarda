import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeetQuestChar1641054441048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "meet_quest_char",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "start_at",
            type: "timestamp",
          },
          {
            name: "location",
            type: "varchar",
          },
          {
            name: "hour",
            type: "varchar",
          },
          {
            name: "max_chars",
            type: "smallint",
          },
          {
            name: "min_chars",
            type: "smallint",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "char_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "quest_id",
            type: "uuid",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKchar",
            columnNames: ["char_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "char",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
          {
            name: "FKquest",
            columnNames: ["quest_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "quest",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("meet_quest_char");
  }
}
