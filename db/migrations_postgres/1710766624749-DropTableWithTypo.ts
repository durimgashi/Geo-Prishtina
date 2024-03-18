import { MigrationInterface, QueryRunner } from "typeorm";

export class DropTableWithTypo1710766624749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paricipations"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paricipations" ("id" SERIAL NOT NULL, "lat" integer NOT NULL, "long" integer NOT NULL, "distance" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "userUuid" uuid, "locationId" integer, "locationUuid" uuid, CONSTRAINT "PK_f567a819566fbb91e8950468719" PRIMARY KEY ("id"))`);
    }

}
