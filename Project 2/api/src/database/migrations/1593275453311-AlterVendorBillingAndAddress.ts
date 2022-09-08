import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterVendorBillingAndAddress1593275453311 implements MigrationInterface {
    public name = 'AlterVendorBillingAndAddress1593275453311';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `company_country_id`');
        await queryRunner.query('ALTER TABLE `vendor` ADD `shipping_address_country_id` int NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `shipping_address_state` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `shipping_address_city` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `shipping_address_line1` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `shipping_address_line2` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `shipping_address_street` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `shipping_address_notes` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `billing_address_country_id` int NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `billing_address_state` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `billing_address_city` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `billing_address_line1` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `billing_address_line2` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `billing_address_street` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `billing_address_notes` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `iban` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` ADD `currency` varchar(255) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `currency`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `iban`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `billing_address_notes`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `billing_address_street`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `billing_address_line2`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `billing_address_line1`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `billing_address_city`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `billing_address_state`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `billing_address_country_id`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `shipping_address_notes`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `shipping_address_street`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `shipping_address_line2`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `shipping_address_line1`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `shipping_address_city`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `shipping_address_state`');
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `shipping_address_country_id`');
        await queryRunner.query('ALTER TABLE `vendor` ADD `company_country_id` int NULL');
    }

}
