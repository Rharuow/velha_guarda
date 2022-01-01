import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeetQuestChar1641054441048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "quests_to_chars",
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
          },
          {
            name: "quest_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKCharToQuests",
            columnNames: ["char_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "chars",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
          {
            name: "FKQuestsToChars",
            columnNames: ["quest_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "quests",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("quests_to_chars");
  }
}
