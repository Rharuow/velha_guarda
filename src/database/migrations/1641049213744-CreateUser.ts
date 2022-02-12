import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1641049213744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "varchar", isUnique: true },
          { name: "email", type: "varchar", isUnique: true },
          { name: "token", type: "varchar", isUnique: true },
          { name: "is_active", type: "boolean", default: false },
          { name: "is_admin", type: "boolean", default: false },
          { name: "password", type: "varchar" },
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
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
