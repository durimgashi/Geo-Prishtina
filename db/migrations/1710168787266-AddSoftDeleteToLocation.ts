import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteToLocation1710168787266 implements MigrationInterface {
    name = 'AddSoftDeleteToLocation1710168787266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`locations\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`locations\` DROP COLUMN \`isDeleted\``);
    }

}
