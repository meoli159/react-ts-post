import { MigrationInterface, QueryRunner } from "typeorm";

export class Test2Postgre1695314236037 implements MigrationInterface {
    name = 'Test2Postgre1695314236037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "test" character varying NOT NULL`);
    }

}
