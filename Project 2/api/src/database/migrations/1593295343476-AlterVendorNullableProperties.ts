import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterVendorNullableProperties1593295343476 implements MigrationInterface {
    public name = 'AlterVendorNullableProperties1593295343476';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_state` `shipping_address_state` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_city` `shipping_address_city` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_line1` `shipping_address_line1` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_line2` `shipping_address_line2` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_street` `shipping_address_street` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_notes` `shipping_address_notes` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_country_id` `billing_address_country_id` int NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_state` `billing_address_state` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_city` `billing_address_city` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_line1` `billing_address_line1` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_line2` `billing_address_line2` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_street` `billing_address_street` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_notes` `billing_address_notes` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `iban` `iban` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `currency` `currency` varchar(255) NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `currency` `currency` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `iban` `iban` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_notes` `billing_address_notes` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_street` `billing_address_street` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_line2` `billing_address_line2` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_line1` `billing_address_line1` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_city` `billing_address_city` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_state` `billing_address_state` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `billing_address_country_id` `billing_address_country_id` int NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_notes` `shipping_address_notes` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_street` `shipping_address_street` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_line2` `shipping_address_line2` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_line1` `shipping_address_line1` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_city` `shipping_address_city` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `shipping_address_state` `shipping_address_state` varchar(255) NOT NULL');
        
    }

}
