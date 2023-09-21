import { MigrationInterface, QueryRunner } from "typeorm";

export class Test11695276385350 implements MigrationInterface {
    name = 'Test11695276385350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "author" varchar NOT NULL, "body" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "author", "body") SELECT "id", "author", "body" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "author" varchar NOT NULL, "body" varchar NOT NULL, "test" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "post"("id", "author", "body") SELECT "id", "author", "body" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
    }

}
