import {MigrationInterface, QueryRunner} from 'typeorm';

export class ALterProduct1593488272857 implements MigrationInterface {
    public name = 'ALterProduct1593488272857';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `product` ADD `account_type` int NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `product` DROP COLUMN `account_type`');
    }

}
