import {MigrationInterface, QueryRunner} from 'typeorm';

export class AltercolumnInproductoption1566539130608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `product_option_value` CHANGE `price` `price` decimal(10,2) DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `product_option_value` CHANGE `price` `price` decimal(10,2) DEFAULT NULL' );
    }

}
