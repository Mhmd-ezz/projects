import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterCountry1593246134587 implements MigrationInterface {
    public name = 'AlterCountry1593246134587';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `country` ADD `is_allowed` int NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `country` DROP COLUMN `is_allowed`');
    }

}
