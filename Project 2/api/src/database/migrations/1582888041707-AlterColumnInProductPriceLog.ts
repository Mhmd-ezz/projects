import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AlterColumnInProductPriceLog1582888041707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product_price_log', 'price_update_file_log_id');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_coupon', new TableColumn({
                name: 'price_update_file_log_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist1 = await queryRunner.hasColumn('product_price_log', 'price');
        if (!ifExist1) {
            await queryRunner.addColumn('vendor_coupon', new TableColumn({
                name: 'price',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist2 = await queryRunner.hasColumn('product_price_log', 'special_price');
        if (!ifExist2) {
            await queryRunner.addColumn('product_price_log', new TableColumn({
                name: 'special_price',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist3 = await queryRunner.hasColumn('product_price_log', 'special_start_date');
        if (!ifExist3) {
            await queryRunner.addColumn('product_price_log', new TableColumn({
                name: 'special_start_date',
                type: 'date',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist4 = await queryRunner.hasColumn('product_price_log', 'special_end_date');
        if (!ifExist4) {
            await queryRunner.addColumn('product_price_log', new TableColumn({
                name: 'special_end_date',
                type: 'date',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist5 = await queryRunner.hasColumn('product_price_log', 'discount_price');
        if (!ifExist5) {
            await queryRunner.addColumn('product_price_log', new TableColumn({
                name: 'discount_price',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist6 = await queryRunner.hasColumn('product_price_log', 'discount_start_date');
        if (!ifExist6) {
            await queryRunner.addColumn('product_price_log', new TableColumn({
                name: 'discount_start_date',
                type: 'date',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist7 = await queryRunner.hasColumn('product_price_log', 'discount_end_date');
        if (!ifExist7) {
            await queryRunner.addColumn('product_price_log', new TableColumn({
                name: 'discount_end_date',
                type: 'date',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('product_price_log', true);
    }

}
