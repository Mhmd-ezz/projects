import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTableSellerAccountSettings1593349454464 implements MigrationInterface {
    public name = 'CreateTableSellerAccountSettings1593349454464';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `seller_account_settings` (`created_by` int NULL, `created_date` varchar(255) NOT NULL, `modified_by` int NULL, `modified_date` varchar(255) NULL, `seller_account_settings_id` int NOT NULL AUTO_INCREMENT, `account_type` int NOT NULL, `fees` int NOT NULL, `max_images` int NOT NULL, `max_videos` int NOT NULL, PRIMARY KEY (`seller_account_settings_id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `seller_account_settings`');
    }

}
