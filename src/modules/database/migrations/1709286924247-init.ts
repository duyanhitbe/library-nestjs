import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709286924247 implements MigrationInterface {
    name = 'Init1709286924247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_active" boolean NOT NULL DEFAULT true, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "borrowers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_81e4cddf7ab4dbd5e79a8f84031" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "author" character varying NOT NULL, "publication_date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e6079dc9902c192a7955722de57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_active" boolean NOT NULL DEFAULT true, "book_info_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "REL_1828de7935c6bad62bb1499927" UNIQUE ("book_info_id"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_borrower" ("book_id" uuid NOT NULL, "borrower_id" uuid NOT NULL, CONSTRAINT "PK_b5a31fe0ca323a7560b2e78d68b" PRIMARY KEY ("book_id", "borrower_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8f575c8b4227fd095bb3efd061" ON "book_borrower" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9ed19810924584062186df0285" ON "book_borrower" ("borrower_id") `);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_1828de7935c6bad62bb14999279" FOREIGN KEY ("book_info_id") REFERENCES "book_infos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_46f5b35b90175a660f99810bc97" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_borrower" ADD CONSTRAINT "FK_8f575c8b4227fd095bb3efd0615" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_borrower" ADD CONSTRAINT "FK_9ed19810924584062186df02855" FOREIGN KEY ("borrower_id") REFERENCES "borrowers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_borrower" DROP CONSTRAINT "FK_9ed19810924584062186df02855"`);
        await queryRunner.query(`ALTER TABLE "book_borrower" DROP CONSTRAINT "FK_8f575c8b4227fd095bb3efd0615"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_46f5b35b90175a660f99810bc97"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_1828de7935c6bad62bb14999279"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ed19810924584062186df0285"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f575c8b4227fd095bb3efd061"`);
        await queryRunner.query(`DROP TABLE "book_borrower"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "book_infos"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "borrowers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
