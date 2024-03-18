import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePointsTable1710772643228 implements MigrationInterface {
    name = 'CreatePointsTable1710772643228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "points" ("id" SERIAL NOT NULL, "points" integer NOT NULL DEFAULT '0', "userId" integer, "userUuid" uuid, CONSTRAINT "REL_39f70c28126c3c75c604527ee9" UNIQUE ("userId", "userUuid"), CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_39f70c28126c3c75c604527ee96" FOREIGN KEY ("userId", "userUuid") REFERENCES "users"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_39f70c28126c3c75c604527ee96"`);
        await queryRunner.query(`DROP TABLE "points"`);
    }

}
