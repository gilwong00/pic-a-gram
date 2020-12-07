import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1607321425322 implements MigrationInterface {
  name = 'createTables1607321425322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "post" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "text" character varying NOT NULL, "user_id" integer NOT NULL, "photoIdId" integer, CONSTRAINT "REL_fe7588ad0ee893e819b774f79e" UNIQUE ("photoIdId"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "image" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "image_src" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT IF NOT EXISTS "FK_fe7588ad0ee893e819b774f79ed" FOREIGN KEY ("photoIdId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT IF EXISTS "FK_fe7588ad0ee893e819b774f79ed"`
    );
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
