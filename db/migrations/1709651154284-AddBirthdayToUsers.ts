import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBirthdayToUsers1709651154284 implements MigrationInterface {
    name = 'AddBirthdayToUsers1709651154284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`birthday\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`birthday\``);
    }

}
