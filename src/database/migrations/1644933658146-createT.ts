import {MigrationInterface, QueryRunner} from "typeorm";

export class createT1644933658146 implements MigrationInterface {
    name = 'createT1644933658146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professional" ("council_number" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "specialty" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_bd2d883e618593ec11bcd75d5ed" UNIQUE ("email"), CONSTRAINT "PK_fd8abab40edcd2165088d14af2d" PRIMARY KEY ("council_number"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("cpf" character varying NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "sex" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "health_plan" character varying NOT NULL, CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"), CONSTRAINT "PK_d1206b00842f789e35c7c5baf61" PRIMARY KEY ("cpf"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "finished" boolean NOT NULL, "professionalId" character varying, "patientId" character varying, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_1efb8063ad19e9e3f9157219033" FOREIGN KEY ("professionalId") REFERENCES "professional"("council_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_1efb8063ad19e9e3f9157219033"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "professional"`);
    }

}
