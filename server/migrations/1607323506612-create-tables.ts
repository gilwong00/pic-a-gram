import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1607323506612 implements MigrationInterface {
  name = 'createTables1607323506612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `
    );
    await queryRunner.query(
      `CREATE TABLE posts ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "text" character varying NOT NULL, "user_id" integer NOT NULL, "photo_id" integer, CONSTRAINT "REL_911737165e17a00081420d087f" UNIQUE ("photo_id"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE images ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "image_src" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE posts ADD CONSTRAINT "FK_911737165e17a00081420d087fa" FOREIGN KEY ("photo_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "FK_911737165e17a00081420d087fa"`
    );
    await queryRunner.query(`DROP TABLE images`);
    await queryRunner.query(`DROP TABLE posts`);
    await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
    await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`);
    await queryRunner.query(`DROP TABLE users`);
  }
}
