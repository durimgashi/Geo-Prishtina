import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParticipationTable1710519822056 implements MigrationInterface {
    name = 'AddParticipationTable1710519822056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`paricipations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`lat\` int NOT NULL, \`long\` int NOT NULL, \`distance\` int NOT NULL, \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`userUuid\` varchar(36) NULL, \`locationId\` int NULL, \`locationUuid\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`paricipations\` ADD CONSTRAINT \`FK_dd03f4976db55ccd3e18ada4867\` FOREIGN KEY (\`userId\`, \`userUuid\`) REFERENCES \`users\`(\`id\`,\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paricipations\` ADD CONSTRAINT \`FK_fa584742073306da3f13458b4b1\` FOREIGN KEY (\`locationId\`, \`locationUuid\`) REFERENCES \`locations\`(\`id\`,\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`paricipations\` DROP FOREIGN KEY \`FK_fa584742073306da3f13458b4b1\``);
        await queryRunner.query(`ALTER TABLE \`paricipations\` DROP FOREIGN KEY \`FK_dd03f4976db55ccd3e18ada4867\``);
        await queryRunner.query(`DROP TABLE \`paricipations\``);
    }

}
