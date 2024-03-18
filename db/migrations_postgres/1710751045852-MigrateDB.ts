import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateDB1710751045852 implements MigrationInterface {
    name = 'MigrateDB1710751045852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paricipations" ("id" SERIAL NOT NULL, "lat" integer NOT NULL, "long" integer NOT NULL, "distance" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "userUuid" uuid, "locationId" integer, "locationUuid" uuid, CONSTRAINT "PK_f567a819566fbb91e8950468719" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "lat" integer NOT NULL, "long" integer NOT NULL, "image" character varying NOT NULL, "image_thumbnail" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "userId" integer, "userUuid" uuid, CONSTRAINT "PK_fb2bdffbeef90d0d8f01ea18f5e" PRIMARY KEY ("id", "uuid"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "surname" character varying(50) NOT NULL, "email" character varying NOT NULL, "birthday" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "isDeleted" boolean NOT NULL DEFAULT false, "roleId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_c313f13246a270bae3664248a79" PRIMARY KEY ("id", "uuid"))`);
        await queryRunner.query(`ALTER TABLE "paricipations" ADD CONSTRAINT "FK_dd03f4976db55ccd3e18ada4867" FOREIGN KEY ("userId", "userUuid") REFERENCES "users"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paricipations" ADD CONSTRAINT "FK_fa584742073306da3f13458b4b1" FOREIGN KEY ("locationId", "locationUuid") REFERENCES "locations"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_3f87db39e3db05a97442f2614d9" FOREIGN KEY ("userId", "userUuid") REFERENCES "users"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_3f87db39e3db05a97442f2614d9"`);
        await queryRunner.query(`ALTER TABLE "paricipations" DROP CONSTRAINT "FK_fa584742073306da3f13458b4b1"`);
        await queryRunner.query(`ALTER TABLE "paricipations" DROP CONSTRAINT "FK_dd03f4976db55ccd3e18ada4867"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "paricipations"`);
    }

}
