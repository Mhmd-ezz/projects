import { MigrationInterface, QueryRunner } from 'typeorm';

export class VendorAndAmbassadors1589812627902 implements MigrationInterface {
    // public name = 'VendorAndAmbassadors1589812627902';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `ambassador` (`created_by` int NOT NULL, `created_date` varchar(255) NOT NULL, `modified_by` int NOT NULL, `modified_date` varchar(255) NOT NULL, `ambassador_id` int NOT NULL AUTO_INCREMENT, `ambassador_prefix_id` varchar(255) NOT NULL, `customer_id` int NOT NULL, `commission` int NOT NULL, `contact_person_name` varchar(255) NOT NULL, `designation` varchar(255) NOT NULL, `address1` varchar(255) NOT NULL, `address2` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `country_id` int NOT NULL, `pincode` varchar(255) NOT NULL, `payment_information` varchar(255) NOT NULL, UNIQUE INDEX `REL_bce4b79594266319535cc51547` (`customer_id`), PRIMARY KEY (`ambassador_id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `ambassador_setting` (`created_by` int NOT NULL, `created_date` varchar(255) NOT NULL, `modified_by` int NOT NULL, `modified_date` varchar(255) NOT NULL, `ambassador_setting_id` int NOT NULL AUTO_INCREMENT, `default_commission` int NOT NULL, PRIMARY KEY (`ambassador_setting_id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `vendor` ADD `ambassador_code` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `vendor` ADD `account_type` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ambassador` ADD CONSTRAINT `FK_bce4b79594266319535cc515473` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('ALTER TABLE `ambassador` DROP FOREIGN KEY `FK_bce4b79594266319535cc515473`', undefined);
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `account_type`', undefined);
        await queryRunner.query('ALTER TABLE `vendor` DROP COLUMN `ambassador_code`', undefined);
        await queryRunner.query('DROP TABLE `ambassador_setting`', undefined);
        await queryRunner.query('DROP INDEX `REL_bce4b79594266319535cc51547` ON `ambassador`', undefined);
        await queryRunner.query('DROP TABLE `ambassador`', undefined);
    }

}
