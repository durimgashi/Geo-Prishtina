import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolesTable1710495825090 implements MigrationInterface {
    name = 'CreateRolesTable1710495825090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`alias\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`, \`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_f42faa2fe67a9e6eade7a4f9ca4\` FOREIGN KEY (\`roleId\`, \`roleUuid\`) REFERENCES \`roles\`(\`id\`,\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_f42faa2fe67a9e6eade7a4f9ca4\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleUuid\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
