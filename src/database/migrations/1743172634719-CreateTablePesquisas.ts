import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePesquisas1743172634719 implements MigrationInterface {
    name = 'CreateTablePesquisas1743172634719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pesquisas" (
                "id" SERIAL NOT NULL,
                "cd_pesquisa" character varying NOT NULL,
                "nr_nota1" float NOT NULL,
                "nr_nota2" float NOT NULL,
                "nr_media" float NOT NULL,
                "dt_criado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "dt_editado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_c4bed2be340a4782e83e55b9003" UNIQUE ("cd_pesquisa"),
                CONSTRAINT "PK_6cab44714aff61cdd0c1d798174" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pesquisas"`);
    }
}