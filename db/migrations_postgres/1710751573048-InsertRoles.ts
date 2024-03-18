import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRoles1710751573048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (id, name, alias) VALUES 
                (1, 'Admin', 'ADMIN'),
                (2, 'User', 'USER');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM roles WHERE id IN (1, 2);
        `);
    }

}
