import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLikesEntity1607328221395 implements MigrationInterface {
  name = 'addLikesEntity1607328221395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "likes" ("id" SERIAL NOT NULL, "post_id" integer, "user_id" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT IF NOT EXISTS "FK_741df9b9b72f328a6d6f63e79ff" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT IF NOT EXISTS "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT IF EXISTS "FK_3f519ed95f775c781a254089171"`
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_741df9b9b72f328a6d6f63e79ff"`
    );
    await queryRunner.query(`DROP TABLE "likes"`);
  }
}
