import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTableNameParticipations1710764063992 implements MigrationInterface {
    name = 'FixTableNameParticipations1710764063992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "participations" ("id" SERIAL NOT NULL, "lat" double precision NOT NULL, "long" double precision NOT NULL, "distance" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "userUuid" uuid, "locationId" integer, "locationUuid" uuid, CONSTRAINT "PK_7aa63b8dcd3d6f8aef8a98bb14a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "lat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "long" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_98ce5b97501a4d5d923416c79f0" FOREIGN KEY ("userId", "userUuid") REFERENCES "users"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_643cf11ce5e3620d279f6096d00" FOREIGN KEY ("locationId", "locationUuid") REFERENCES "locations"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_643cf11ce5e3620d279f6096d00"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_98ce5b97501a4d5d923416c79f0"`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "long" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "lat" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "participations"`);
    }

}
