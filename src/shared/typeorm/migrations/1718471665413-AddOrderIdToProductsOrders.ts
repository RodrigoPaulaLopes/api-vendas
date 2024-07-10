import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToProductsOrders1718471665413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_products',
            new TableColumn({
                name: 'order_id',
                type: 'uuid',
                isNullable: true,

            })
        )

        // await queryRunner.createForeignKey('orders_products', {
        //     name: 'OrdersProductsOrder',
        //     columnNames: ['order_id'],
        //     referencedColumnNames: ['id'],
        //     referencedTableName: 'order',
        //     onDelete: 'SET NULL',
        //     clone: function (): TableForeignKey {
        //         throw new Error("Function not implemented.");
        //     }
        // })

        const foreignKey = new TableForeignKey({
            name: 'OrdersProductsOrder',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'SET NULL',
        });

        await queryRunner.createForeignKey('orders_products', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder')
        await queryRunner.dropColumn('orders_products', 'order_id')
    }

}
