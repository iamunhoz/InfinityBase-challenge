import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserNameColumn1725656732112 implements MigrationInterface {
    name = 'AddUserNameColumn1725656732112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
