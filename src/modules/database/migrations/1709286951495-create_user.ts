import { RoleEnum } from "@app/apis/user/user.enum";
import { hash } from "argon2";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1709286951495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const username = 'admin';
        const password = await hash('admin');
        const role = RoleEnum.ADMIN;

        await queryRunner.query(`INSERT INTO "users" ("username", "password", "role") VALUES ('${username}', '${password}', '${role}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users" WHERE "users"."username" = 'admin'`)
    }

}
