import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLatLongDataTypes1710757784256 implements MigrationInterface {
    name = 'ChangeLatLongDataTypes1710757784256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add new columns with the desired data type
        await queryRunner.query(`ALTER TABLE "locations" ADD "new_lat" double precision`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "new_long" double precision`);
        await queryRunner.query(`ALTER TABLE "paricipations" ADD "new_lat" double precision`);
        await queryRunner.query(`ALTER TABLE "paricipations" ADD "new_long" double precision`);

        // Copy data from old columns to new columns
        await queryRunner.query(`UPDATE "locations" SET "new_lat" = "lat"`);
        await queryRunner.query(`UPDATE "locations" SET "new_long" = "long"`);
        await queryRunner.query(`UPDATE "paricipations" SET "new_lat" = "lat"`);
        await queryRunner.query(`UPDATE "paricipations" SET "new_long" = "long"`);

        // Drop old columns
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "paricipations" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "paricipations" DROP COLUMN "long"`);

        // Rename new columns to match old column names if necessary
        await queryRunner.query(`ALTER TABLE "locations" RENAME COLUMN "new_lat" TO "lat"`);
        await queryRunner.query(`ALTER TABLE "locations" RENAME COLUMN "new_long" TO "long"`);
        await queryRunner.query(`ALTER TABLE "paricipations" RENAME COLUMN "new_lat" TO "lat"`);
        await queryRunner.query(`ALTER TABLE "paricipations" RENAME COLUMN "new_long" TO "long"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Add back the old columns with integer data type
        await queryRunner.query(`ALTER TABLE "locations" ADD "old_lat" integer`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "old_long" integer`);
        await queryRunner.query(`ALTER TABLE "paricipations" ADD "old_lat" integer`);
        await queryRunner.query(`ALTER TABLE "paricipations" ADD "old_long" integer`);

        // 2. Copy data from new columns to old columns
        await queryRunner.query(`UPDATE "locations" SET "old_lat" = "lat"`);
        await queryRunner.query(`UPDATE "locations" SET "old_long" = "long"`);
        await queryRunner.query(`UPDATE "paricipations" SET "old_lat" = "lat"`);
        await queryRunner.query(`UPDATE "paricipations" SET "old_long" = "long"`);

        // 3. Drop new columns
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "paricipations" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "paricipations" DROP COLUMN "long"`);

        // 4. Rename old columns to match original column names
        await queryRunner.query(`ALTER TABLE "locations" RENAME COLUMN "old_lat" TO "lat"`);
        await queryRunner.query(`ALTER TABLE "locations" RENAME COLUMN "old_long" TO "long"`);
        await queryRunner.query(`ALTER TABLE "paricipations" RENAME COLUMN "old_lat" TO "lat"`);
        await queryRunner.query(`ALTER TABLE "paricipations" RENAME COLUMN "old_long" TO "long"`);
    }

}
