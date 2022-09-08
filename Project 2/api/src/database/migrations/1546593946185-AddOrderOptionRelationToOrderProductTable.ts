import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddOrderOptionRelationToOrderProductTable1546593946185 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_order_option_order_product1',
        columnNames: ['order_product_id'],
        referencedColumnNames: ['order_product_id'],
        referencedTableName: 'order_product',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order_option');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order_option');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
