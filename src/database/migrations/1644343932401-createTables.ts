import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1644343932401 implements MigrationInterface {
    name = 'createTables1644343932401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "resetCode" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts_products" ("cartId" uuid NOT NULL, "productId" uuid NOT NULL, "productQuantity" integer NOT NULL, CONSTRAINT "PK_9adeb6d4a17447f47ed8f204c31" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" double precision NOT NULL, "name" character varying NOT NULL, "buysId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_34ecbce508fa8a98d0f23d9372a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carts_products" ADD CONSTRAINT "FK_d0288e4c3846d1420afaef5a274" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts_products" ADD CONSTRAINT "FK_666ae4eef3311f0733b1e81b932" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_79eb8c15578bd1c0e7109d65dc9" FOREIGN KEY ("buysId") REFERENCES "buys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_79eb8c15578bd1c0e7109d65dc9"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "carts_products" DROP CONSTRAINT "FK_666ae4eef3311f0733b1e81b932"`);
        await queryRunner.query(`ALTER TABLE "carts_products" DROP CONSTRAINT "FK_d0288e4c3846d1420afaef5a274"`);
        await queryRunner.query(`DROP TABLE "buys"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "carts_products"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
