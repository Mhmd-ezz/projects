import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddRelationProductionOptionToProductTable1562234808237 implements MigrationInterface {
    private ProductOptionToProductForeignKeys = new TableForeignKey({
        name: 'fk_tbl_product_option_tbl_product',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('product_option');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.ProductOptionToProductForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('product_option');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.ProductOptionToProductForeignKeys);
        }
    }
}
