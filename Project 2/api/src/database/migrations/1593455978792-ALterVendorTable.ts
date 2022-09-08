import {MigrationInterface, QueryRunner} from 'typeorm';

export class ALterVendorTable1593455978792 implements MigrationInterface {
    public name = 'ALterVendorTable1593455978792';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` ADD `seller_account_settings_id` int NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `seller_account_settings_id`');
    }

}
