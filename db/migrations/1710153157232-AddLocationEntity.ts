import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationEntity1710153157232 implements MigrationInterface {
    name = 'AddLocationEntity1710153157232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`locations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`lat\` int NOT NULL, \`long\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`image_thumbnail\` varchar(255) NOT NULL, \`userId\` int NULL, \`userUuid\` varchar(36) NULL, PRIMARY KEY (\`id\`, \`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`locations\` ADD CONSTRAINT \`FK_3f87db39e3db05a97442f2614d9\` FOREIGN KEY (\`userId\`, \`userUuid\`) REFERENCES \`users\`(\`id\`,\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`locations\` DROP FOREIGN KEY \`FK_3f87db39e3db05a97442f2614d9\``);
        await queryRunner.query(`DROP TABLE \`locations\``);
    }

}
