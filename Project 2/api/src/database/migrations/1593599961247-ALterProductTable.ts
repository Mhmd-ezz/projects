import {MigrationInterface, QueryRunner} from 'typeorm';

export class ALterProductTable1593599961247 implements MigrationInterface {
    public name = 'ALterProductTable1593599961247';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `product_translation` (`created_by` int NULL, `created_date` varchar(255) NOT NULL, `modified_by` int NULL, `modified_date` varchar(255) NULL, `translation_id` int NOT NULL AUTO_INCREMENT, `language_code` varchar(255) NOT NULL, `product_id` int NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`translation_id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `product_translation`');
    }

}
