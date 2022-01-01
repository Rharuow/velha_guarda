import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChar1641051599792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "chars",
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
            name: "lvl",
            type: "smallint",
          },
          {
            name: "sex",
            type: "enum",
            enum: ["m", "f"],
          },
          {
            name: "voc",
            type: "enum",
            enum: ["ms", "ed", "ek", "rp"],
          },
          {
            name: "max_shared_lvl",
            type: "smallint",
          },
          {
            name: "min_shared_lvl",
            type: "smallint",
          },
          {
            name: "residence",
            type: "varchar",
          },
          {
            name: "premium",
            type: "boolean",
          },
          {
            name: "online",
            type: "boolean",
          },
          {
            name: "user_id",
            type: "uuid",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("chars");
  }
}
