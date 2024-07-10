import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToProductsOrders1718471643360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_products',
            new TableColumn({
                name: 'product_id',
                type: 'uuid',
                isNullable: true,

            })
        )

        const foreignKey = new TableForeignKey({
            name: 'OrdersProductsProduct',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
        });

        await queryRunner.createForeignKey('orders_products', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products', 'OrdersProductsProduct')
        await queryRunner.dropColumn('orders_products', 'product_id')
    }

}
