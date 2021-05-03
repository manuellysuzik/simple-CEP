import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class userCreate1619667458895 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "lastname",
            type: "varchar"
          },
          {
            name: "nickname",
            type: "varchar",
            isUnique: true,
            length: "30"
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "bio",
            type: "varchar",
            length: "100"
          },
          {
            name: "createdAt",
            type: "date",
            default: "now()"
          },
          {
            name: "updatedAt",
            type: "date",
            default: "now()"
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users")
  }

}
