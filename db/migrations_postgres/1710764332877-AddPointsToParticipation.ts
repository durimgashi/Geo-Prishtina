import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPointsToParticipation1710764332877 implements MigrationInterface {
    name = 'AddPointsToParticipation1710764332877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participations" ADD "points" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participations" DROP COLUMN "points"`);
    }

}
