import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUUIDFromRoles1710504686529 implements MigrationInterface {
    name = 'DropUUIDFromRoles1710504686529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_f42faa2fe67a9e6eade7a4f9ca4\``);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleUuid\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`uuid\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD PRIMARY KEY (\`id\`, \`uuid\`)`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_f42faa2fe67a9e6eade7a4f9ca4\` FOREIGN KEY (\`roleId\`, \`roleUuid\`) REFERENCES \`roles\`(\`id\`,\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
