import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterVendor1593174045977 implements MigrationInterface {
    public name = 'AlterVendor1593174045977';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `ambassador_code` `ambassador_code` varchar(255) NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `ambassador_code` `ambassador_code` varchar(255) NOT NULL');
    }

}
