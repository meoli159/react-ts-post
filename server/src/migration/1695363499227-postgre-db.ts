import { MigrationInterface, QueryRunner } from "typeorm";

export class PostgreDb1695363499227 implements MigrationInterface {
    name = 'PostgreDb1695363499227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
